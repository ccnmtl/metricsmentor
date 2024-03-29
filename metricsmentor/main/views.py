import re

from courseaffils.columbia import CourseStringTemplate, CanvasTemplate
from courseaffils.models import Course
from courseaffils.views import get_courses_for_user
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.mixins import (
    LoginRequiredMixin
)
from django.contrib.auth.models import Group
from django.shortcuts import render
from django.http import (
    HttpResponseRedirect
)
from django.urls.base import reverse
from django.views.generic.base import TemplateView, View
from django.views.generic.detail import DetailView
from lti_provider.models import LTICourseContext
from metricsmentor.main.utils import send_template_email
from metricsmentor.mixins import LoggedInCourseMixin
from metricsmentor.main.models import Graph
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from scipy.stats import linregress
import json


class CoursesView(LoginRequiredMixin, TemplateView):
    template_name = 'main/courses.html'
    http_method_names = ['get', 'post']

    def get_context_data(self, **kwargs):

        return {
            'user': self.request.user,
            'courses': get_courses_for_user(
                self.request.user).order_by('title'),
            'page_type': 'dashboard'
        }


class CourseDetailView(LoggedInCourseMixin, DetailView):
    model = Course

    def get_context_data(self, **kwargs):
        is_faculty = self.object.is_true_faculty(self.request.user)

        return {
            'course': self.object,
            'is_faculty': is_faculty,
        }


class SimulationDashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'main/simulation_dashboard.html'

    def get_context_data(self, **kwargs):
        course_id = self.kwargs.get('pk', None)
        course = Course.objects.get(pk=course_id)

        return {
            'user': self.request.user,
            'course': course,
        }


class LTICourseCreate(LoginRequiredMixin, View):

    def notify_staff(self, course):
        data = {
            'course': course,
            'user': self.request.user
        }
        send_template_email(
            'Metrics Mentor Course Connected',
            'main/notify_lti_course_connect.txt',
            data, settings.SERVER_EMAIL)

    def thank_faculty(self, course):
        user = self.request.user
        send_template_email(
            'Metrics Mentor Course Connected',
            'main/lti_course_connect.txt',
            {'course': course},
            user.email if user.email else user.username + '@columbia.edu')

    def groups_from_context(self, course_context):
        group, created = Group.objects.get_or_create(name=course_context)
        faculty_group, created = Group.objects.get_or_create(
            name='{}_faculty'.format(course_context))
        return (group, faculty_group)

    def groups_from_sis_course_id(self, attrs):
        user = self.request.user
        st_affil = CourseStringTemplate.to_string(attrs)
        group, created = Group.objects.get_or_create(name=st_affil)
        user.groups.add(group)

        attrs['member'] = 'fc'
        fc_affil = CourseStringTemplate.to_string(attrs)
        faculty_group, created = Group.objects.get_or_create(name=fc_affil)
        user.groups.add(faculty_group)
        return (group, faculty_group)

    def add_yt_to_course(self, sis_course_id, course):
        """
        Sets the year and term attributes on a course if
        they can be determined from a sis_course_id
        """

        # CanvasTemplate matches a CU course string
        cu_course = CanvasTemplate.to_dict(sis_course_id)
        # TC courses use a different format
        tc_course = re.match(
            (r'(?P<year>\d{4})(?P<term>\d{2})'), sis_course_id)

        if cu_course:
            course.info.term = cu_course['term']
            course.info.year = cu_course['year']
            course.info.save()
        elif tc_course:
            course.info.term = tc_course['term']
            course.info.year = tc_course['year']
            course.info.save()

    def post(self, *args, **kwargs):
        user = self.request.user
        course_context = self.request.POST.get('lms_course')
        title = self.request.POST.get('lms_course_title')
        sis_course_id = '' if self.request.POST['sis_course_id'] == 'None' \
            else self.request.POST['sis_course_id']

        # This view needs to take four steps to create a course
        # 1. Create groups for students and faculty, named after the course
        # 2. Create the course
        # 3. Set the year and term, if applicable
        # 4. Create the course context

        # 1. Create groups
        cu_course = CanvasTemplate.to_dict(sis_course_id)
        if cu_course:
            (group, faculty_group) = self.groups_from_sis_course_id(cu_course)
        else:
            (group, faculty_group) = self.groups_from_context(course_context)

        user.groups.add(group)
        user.groups.add(faculty_group)

        # 2. Create the course
        course, created = Course.objects.get_or_create(
            group=group, faculty_group=faculty_group,
            defaults={'title': title})

        # 3. Set the term and year of the course
        if sis_course_id:
            self.add_yt_to_course(sis_course_id, course)

        # 4. Create the course context
        (ctx, created) = LTICourseContext.objects.get_or_create(
            group=group, faculty_group=faculty_group,
            lms_course_context=course_context)

        messages.add_message(
            self.request, messages.INFO,
            '<strong>Success!</strong> ' +
            '{} is connected to Metrics Mentor.'.format(title))

        self.notify_staff(course)
        self.thank_faculty(course)

        return HttpResponseRedirect(reverse('lti-landing-page'))


class LTICourseSelector(LoginRequiredMixin, View):

    def get(self, request, context):
        try:
            messages.add_message(
                request, messages.INFO,
                'Reminder: please log out of Metrics Mentor '
                'after you log out of Courseworks.')

            ctx = LTICourseContext.objects.get(lms_course_context=context)
            url = u'/course/{}/'.format(ctx.group.course.id)
        except LTICourseContext.DoesNotExist:
            url = '/'

        return HttpResponseRedirect(url)


@csrf_exempt
def calculate_regression(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        x_values = data.get('x_values', [])
        y_values = data.get('y_values', [])

        if x_values and y_values:
            result = linregress(x_values, y_values)

            return JsonResponse({
                'slope': result.slope,
                'intercept': result.intercept,
                'rvalue': result.rvalue,
                'pvalue': result.pvalue,
                'stderr': result.stderr,
            })

    return JsonResponse({'error': 'Invalid data.'}, status=400)


def handler404(request):
    return render(request, '404.html')


@method_decorator(csrf_exempt, name='dispatch')
class SaveSim1GraphView(LoggedInCourseMixin, View):

    def post(self, request):

        json_data = json.loads(request.body)
        graph_data = json_data.get('data')
        user = request.user
        course_pk = graph_data.get('coursePk')
        course = Course.objects.get(pk=course_pk)

        graph = Graph.objects.create(user=user, simulation=1,
                                     data=graph_data, course=course)

        print(f'Graph data saved successfully: {graph}')

        return JsonResponse({'message': 'Graph data saved successfully'},
                            status=201)
