import re


from courseaffils.columbia import CourseStringTemplate, CanvasTemplate
from courseaffils.models import Course
from courseaffils.views import get_courses_for_user
from django.conf import settings, LazySettings
from django.contrib import messages
from django.contrib.auth.mixins import (
    LoginRequiredMixin
)
from django.contrib.auth.models import Group
from django.shortcuts import render, get_object_or_404
from django.http import (
    HttpResponseRedirect, HttpResponse
)
from django.urls.base import reverse
from django.views.generic.base import TemplateView, View
from django.views.generic.detail import DetailView
from lti_provider.models import LTICourseContext
from metricsmentor.main.utils import send_template_email
from metricsmentor.mixins import LoggedInCourseMixin
from metricsmentor.main.models import (
    Answer, QuizSubmission, SimulationVisibility
)
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from scipy.stats import linregress, norm
import numpy as np
import statsmodels.api as sm
import json
import math
from lti_tool.views import LtiLaunchBaseView, OIDCLoginInitView
from lti_dynamic_registration.views import DynamicRegistrationBaseView
from lti_dynamic_registration.constants import CanvasPrivacyLevel
from lti_dynamic_registration.types import (
    CanvasLtiMessage,
    CanvasLtiRegistration,
    CanvasLtiToolConfiguration,
)
from urllib.parse import urljoin, urlparse
from django.templatetags.static import static
from django.views.decorators.clickjacking import xframe_options_exempt


def ensure_https(url: str) -> str:
    if not url.startswith('http://') and not url.startswith('https://'):
        return 'https://' + url
    return url


def is_static_file_remote(path: str) -> bool:
    url = static(path)
    parsed = urlparse(url)
    return bool(parsed.scheme and parsed.netloc)


def get_icon_url(settings: LazySettings, host: str) -> str:
    icon_url = static(settings.LTI_TOOL_CONFIGURATION['embed_icon_url'])

    if not is_static_file_remote(icon_url):
        icon_url = urljoin(f'https://{host}', icon_url)

    return icon_url


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

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()

        return HttpResponseRedirect(
            reverse('simulation-dashboard-view',
                    kwargs={'pk': self.object.id}))

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
        is_faculty = course.is_true_faculty(self.request.user)

        # Get visible simulations
        visible_sims = SimulationVisibility.objects.filter(
            course=course,
            is_visible=True
        ).values_list('simulation', flat=True)

        # Convert to list for JSON serialization
        visible_simulations = list(visible_sims)

        return {
            'user': self.request.user,
            'course': course,
            'is_faculty': is_faculty,
            'visible_simulations': json.dumps(visible_simulations)
        }


class ToggleVisibilityView(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return JsonResponse({
                    'status': 'error',
                    'message': 'Unauthorized'
                },
                status=403
            )

        try:
            data = json.loads(request.body)
            course_id = data.get('course_id')
            simulation_id = data.get('simulation_id')

            course = Course.objects.get(pk=course_id)

            visibility, created = SimulationVisibility.objects.get_or_create(
                course=course,
                simulation=simulation_id
            )

            # Toggle visibility
            visibility.is_visible = not visibility.is_visible
            visibility.save()

            return JsonResponse({
                'status': 'success',
                'is_visible': visibility.is_visible,
                'simulation_id': simulation_id
            })

        except Exception:
            return JsonResponse(
                {'status': 'error', 'message': 'An internal error occurred'},
                status=500
            )


class JSONConfigView(View):
    """
    JSON configuration endpoint for LTI 1.3.

    In Canvas LMS, an LTI Developer Key can be created via Manual
    Entry, or by URL. This view provides the JSON necessary for URL
    configuration in Canvas.

    https://canvas.instructure.com/doc/api/file.lti_dev_key_config.html
    """
    def get(self, request, *args, **kwargs):
        domain = request.get_host()
        title = settings.LTI_TOOL_CONFIGURATION['title']
        icon_url = static(settings.LTI_TOOL_CONFIGURATION['embed_icon_url'])
        target_link_uri = urljoin(
            'https://{}'.format(domain), reverse('lti-launch'))

        uuid_str = kwargs.get('registration_uuid')
        oidc_init_uri = urljoin(
            'https://{}'.format(domain),
            reverse('init', kwargs={'registration_uuid': uuid_str}))

        lti_platform = 'columbiasce.test.instructure.com'
        if hasattr(settings, 'LTI_PLATFORM'):
            lti_platform = settings.LTI_PLATFORM

        json_obj = {
            'title': title,
            'description': settings.LTI_TOOL_CONFIGURATION['description'],
            'oidc_initiation_url': oidc_init_uri,
            'target_link_uri': target_link_uri,
            'scopes': [
                'https://purl.imsglobal.org/spec/lti-ags/scope/lineitem',
                'https://purl.imsglobal.org/spec/lti-ags/lti/claim/lis',

                'https://purl.imsglobal.org/'
                'spec/lti-ags/scope/result.readonly',

                'https://purl.imsglobal.org/'
                'spec/lti-nrps/scope/contextmembership.readonly',
            ],
            'extensions': [
                {
                    'domain': domain,
                    'tool_id': 'metricsmentor',
                    'platform': lti_platform,
                    'privacy_level': 'public',
                    'settings': {
                        'text': 'Launch ' + title,
                        'labels': {
                            'en': 'Launch ' + title,
                        },
                        'icon_url': icon_url,
                        'selection_height': 800,
                        'selection_width': 800,
                        'placements': [
                            {
                                'text': 'MetricsMentor',
                                'icon_url': icon_url,
                                'placement': 'course_navigation',
                                'message_type': 'LtiResourceLinkRequest',
                                'target_link_uri': target_link_uri,
                                'selection_height': 500,
                                'selection_width': 500
                            }
                        ],
                    }
                }
            ],
            'public_jwk_url': urljoin(
                'https://{}'.format(domain), reverse('jwks'))
        }
        return JsonResponse(json_obj)


@method_decorator(xframe_options_exempt, name='dispatch')
class MyOIDCLoginInitView(OIDCLoginInitView):
    pass


@method_decorator(xframe_options_exempt, name='dispatch')
class LtiLaunchView(LtiLaunchBaseView, TemplateView):
    """
    https://github.com/academic-innovation/django-lti/blob/main/README.md#handling-an-lti-launch
    """
    template_name = 'lti_provider/landing_page.html'
    lti_tool_name = None
    course = None

    @xframe_options_exempt
    def handle_resource_launch(self, request, lti_launch):
        if settings.DEBUG:
            print('All lti_launch data:', lti_launch.get_launch_data())
            print('User:', lti_launch.user.__dict__)
            print('NRPS claim:', lti_launch.nrps_claim)
            print('Roles claim:', lti_launch.roles_claim)

        self.lti_tool_name = lti_launch.platform_instance_claim.get(
            'product_family_code')
        if self.lti_tool_name:
            self.lti_tool_name = self.lti_tool_name.capitalize()

        self.deployment_id = lti_launch.deployment.deployment_id
        self.course_id = lti_launch.context_claim.get('id')
        self.course_name = lti_launch.context_claim.get('title')

        # Search for course by context_id in EconPractice database
        try:
            self.course = Course.objects.get(
                context_id=self.course_id, deployment_id=self.deployment_id)
        except Course.DoesNotExist:
            pass

        return self.get(request)

    @xframe_options_exempt
    def get_context_data(self, **kwargs):
        domain = self.request.get_host()
        url = settings.LTI_TOOL_CONFIGURATION['landing_url'].format(
            self.request.scheme, domain, kwargs.get('context'))

        lti_tool_name = 'LTI'
        if self.lti_tool_name:
            lti_tool_name = self.lti_tool_name

        return {
            'DEBUG': settings.DEBUG,
            'landing_url': url,
            'title': settings.LTI_TOOL_CONFIGURATION['title'],
            'lti_tool_name': lti_tool_name,
            'course': self.course,
            'deployment_id': self.deployment_id,
            'course_id': self.course_id,
            'course_name': self.course_name,
        }


class DynamicRegistrationView(DynamicRegistrationBaseView):
    tool_friendly_name = "MetricsMentor"
    lti_platform = 'columbiasce.test.instructure.com'

    def dispatch(self, *args, **kwargs) -> HttpResponse:
        if hasattr(settings, 'LTI_PLATFORM'):
            self.lti_platform = settings.LTI_PLATFORM

        return super().dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs) -> HttpResponse:
        context = {
            # Pass in a default lti_platform
            'lti_platform': ensure_https(self.lti_platform),
        }
        return render(request, 'registration/lti_registration.html', context)

    def post(self, request, *args, **kwargs) -> HttpResponse:
        # Perform the registration steps. Typically this would involve:
        # 1. Register the platform in the tool
        issuer = request.POST.get('issuer')
        if issuer:
            issuer = issuer.strip()
            issuer = ensure_https(issuer)

        authorization_endpoint = urljoin(issuer, '/api/lti/authorize_redirect')

        token_endpoint = urljoin(issuer, '/login/oauth2/token')
        jwks_uri = urljoin(issuer, '/api/lti/security/jwks')

        reg = self.register_platform_in_tool(
            issuer, {
                'issuer': issuer,
                'authorization_endpoint': authorization_endpoint,
                'token_endpoint': token_endpoint,
                'jwks_uri': jwks_uri,
            }
        )

        # 2. Register the tool in the platform
        openid_config = self.get_openid_config()
        privacy_level = CanvasPrivacyLevel('public')
        host = request.get_host()
        target_link_uri = f'https://{host}/lti/launch/'
        icon_url = get_icon_url(settings, host)
        oidc_init_uri = urljoin(
            'https://{}'.format(host),
            reverse('oidc_init', kwargs={'registration_uuid': reg.uuid}))

        lti_tool_config = CanvasLtiToolConfiguration(
            domain=self.lti_platform,
            target_link_uri=target_link_uri,
            claims=[
                'sub',
                'iss',
                'name',
                'given_name',
                'family_name',
                'nickname',
                'picture',
                'email',
                'locale'
            ],
            messages=[
                CanvasLtiMessage(
                    label='MetricsMentor',
                    icon_uri=icon_url,
                    type='LtiResourceLinkRequest',
                    placements=['course_navigation'],
                    target_link_uri=target_link_uri,
                    default_enabled=True
                )
            ],
            description=settings.LTI_TOOL_CONFIGURATION['description'],
            privacy_level=privacy_level,
            tool_id='metricsmentor',
        )
        tool_platform_registration = CanvasLtiRegistration(
            client_name='MetricsMentor',
            target_link_uri=target_link_uri,
            initiate_login_uri=oidc_init_uri,
            jwks_uri=jwks_uri,
            scopes=[
                'https://purl.imsglobal.org/spec/lti-ags/scope/lineitem',
            ],
            lti_tool_configuration=lti_tool_config,
        )

        if settings.DEBUG:
            print('registration', tool_platform_registration.to_dict())
        client_id = self.register_tool_in_platform(
            openid_config, tool_platform_registration)

        # 3. Update the platform registration with the client ID returned in
        #    step 2
        reg.client_id = client_id
        reg.save()

        # Return a page containing javascript that calls a special
        # platform postMessage endpoint
        return self.success_response()


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
            robust_se = calculate_whites_robust_se(x_values, y_values)

            return JsonResponse({
                'slope': result.slope,
                'intercept': result.intercept,
                'rvalue': result.rvalue,
                'pvalue': result.pvalue,
                'stderr': result.stderr,
                'stderr_robust': robust_se[1],
            })

    return JsonResponse({'error': 'Invalid data.'}, status=400)


def calculate_whites_robust_se(x_values, y_values):
    # Add a constant to the independent variables
    X = sm.add_constant(x_values)
    # Fit the OLS model
    model = sm.OLS(y_values, X).fit()
    # Get the robust covariance matrix using White's method
    robust_cov = model.get_robustcov_results(cov_type='HC0')
    # Extract the robust standard errors
    robust_se = robust_cov.bse
    return robust_se


@csrf_exempt
def calculate_multiple_regression(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        x1_values = np.array(data.get('x1_values', []))
        x2_values = np.array(data.get('x2_values', []))
        y_values = np.array(data.get('y_values', []))

        if x1_values.size and x2_values.size and y_values.size:
            X = sm.add_constant(np.column_stack((x1_values, x2_values)))
            model = sm.OLS(y_values, X)
            if data.get('robust', False) is True:
                cov_type = 'HC3'
            else:
                cov_type = 'nonrobust'
            result = model.fit(cov_type=cov_type)

            # Convert NumPy arrays to Python lists
            stderr_list = result.bse.tolist()
            stderr_x1 = stderr_list[1]
            stderr_x2 = stderr_list[2]

            return JsonResponse({
                'slope_x1': result.params[1],
                'slope_x2': result.params[2],
                'intercept': result.params[0],
                'rvalue': np.sqrt(result.rsquared),
                'pvalue': result.f_pvalue,
                'stderr': [stderr_x1, stderr_x2],
            })

    return JsonResponse({'error': 'Invalid data or method.'}, status=400)


@csrf_exempt
def calculate_pvalue(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        z_value = data.get('tvalue')

        if z_value == "Infinity":
            z_value = float('inf')
        elif z_value == "-Infinity":
            z_value = float('-inf')

        # Calculate p-values
        if z_value >= 0:
            p_value_left = 1 - round(norm.cdf(z_value), 4)
            p_value_right = 1 - round(norm.cdf(z_value), 4)
            p_value_two_sided = 2 * (1 - round(norm.cdf(z_value), 4))
        else:
            p_value_left = round(norm.cdf(z_value), 4)
            p_value_right = round(norm.cdf(z_value), 4)
            p_value_two_sided = 2 * round(norm.cdf(z_value), 4)

        if z_value > 2.99 or z_value < -2.99:
            p_value_left = 0
            p_value_right = 0
            p_value_two_sided = 0

        return JsonResponse({
            'value_left': p_value_left,
            'value_right': p_value_right,
            'value_two_sided': p_value_two_sided
        })

    return JsonResponse({'error': 'Invalid data or method.'}, status=400)


@csrf_exempt
def calculate_critical_value(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        alpha = data.get('alpha')  # Significance level

        # Calculate critical values
        critical_value_left = -1.28 if math.isclose(alpha, 0.10) else (
            -1.64 if math.isclose(alpha, 0.05) else -2.33)
        critical_value_right = 1.28 if math.isclose(alpha, 0.10) else (
            1.64 if math.isclose(alpha, 0.05) else 2.33)
        critical_value_two_sided = 1.64 if math.isclose(alpha, 0.10) else (
            1.96 if math.isclose(alpha, 0.05) else 2.58)

        return JsonResponse({
            'value_left': critical_value_left,
            'value_right': critical_value_right,
            'value_two_sided': critical_value_two_sided,
        })

    return JsonResponse({'error': 'Invalid data or method.'}, status=400)


def handler404(request):
    return render(request, '404.html')


@method_decorator(csrf_exempt, name='dispatch')
class CreateSubmission(LoggedInCourseMixin, View):

    def dispatch(self, request, *args, **kwargs):
        if request.method == 'PUT':
            return self.put(request, *args, **kwargs)
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        json_data = json.loads(request.body)
        graph_data = json_data.get('data')
        user = request.user
        course_pk = self.kwargs.get('pk')
        course = Course.objects.get(pk=course_pk)
        simulation = json_data.get('simulation')

        quiz_submission = QuizSubmission.objects.create(
            user=user,
            simulation=simulation,
            data=graph_data,
            course=course,
            active=True
        )

        print(f'Quiz submission created successfully: {quiz_submission}')

        return JsonResponse({
            'message': 'Quiz submission saved successfully',
            'submission_id': quiz_submission.id
        }, status=201)

    def put(self, request, *args, **kwargs):
        json_data = json.loads(request.body)
        graph_data = json_data.get('data')
        submission_id = json_data.get('submission_id')
        simulation = json_data.get('simulation')

        try:
            quiz_submission = QuizSubmission.objects.get(id=submission_id)
            quiz_submission.data = graph_data
            quiz_submission.simulation = simulation
            quiz_submission.save()

            print(f'Quiz submission updated successfully: {quiz_submission}')

            return JsonResponse({
                'message': 'Quiz submission updated successfully',
                'submission_id': quiz_submission.id
            }, status=200)
        except QuizSubmission.DoesNotExist:
            return JsonResponse({'status': 'fail',
                                 'message': 'Submission not found'},
                                status=404)


class SaveAnswer(LoggedInCourseMixin, View):

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        submission_id = data.get('submission_id')
        question_number = data.get('question_number')
        question_type = data.get('question_type')
        selected_option = data.get('selected_option')
        is_correct = data.get('is_correct')
        additional_data = data.get('additional_data', {})

        try:
            submission = QuizSubmission.objects.get(id=submission_id)
        except QuizSubmission.DoesNotExist:
            return JsonResponse({'status': 'fail',
                                 'message': 'Submission not found'},
                                status=404)

        answer = Answer.objects.create(
            quiz_submission=submission,
            question_number=question_number,
            question_type=question_type,
            selected_option=selected_option,
            is_correct=is_correct,
            data=additional_data,
            active=is_correct
        )

        return JsonResponse({'status': 'success', 'answer_id': answer.id})


class GetQuizView(LoginRequiredMixin, View):

    def get(self, request, *args, **kwargs):
        user = request.user
        course_id = self.kwargs.get('pk')
        simulation_id = request.GET.get('simulation_id')
        course = get_object_or_404(Course, id=course_id)

        # Fetch the latest active quiz submission
        latest_submission = QuizSubmission.objects.filter(
            user=user,
            course=course,
            simulation=simulation_id,
            active=True
        ).order_by('-created_at').first()

        if not latest_submission:
            return JsonResponse({
                'answers': [],
                'submission_id': None
            })

        # Filter answers by active=True for the latest submission
        answers = Answer.objects.filter(
            quiz_submission=latest_submission,
            active=True
        )

        answers_data = [
            {
                'question_number': answer.question_number,
                'question_type': answer.question_type,
                'selected_option': answer.selected_option,
                'is_correct': answer.is_correct,
                'data': answer.data,
                'created_at': answer.created_at.isoformat(),
                'updated_at': answer.updated_at.isoformat(),
            }
            for answer in answers
        ]

        return JsonResponse({
            'answers': answers_data,
            'submission_id': latest_submission.pk
        })


class DeleteQuizSubmissionView(LoginRequiredMixin, View):

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        submission_id = data.get('submission_id')

        try:
            quiz_submission = QuizSubmission.objects.get(id=submission_id)
        except QuizSubmission.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'Quiz submission not found'
            }, status=404)

        # Mark the quiz submission as inactive
        quiz_submission.active = False
        quiz_submission.save()

        # Mark all answers under this submission as inactive
        Answer.objects.filter(quiz_submission=quiz_submission).update(
            active=False)

        return JsonResponse({
            'status': 'success',
            'message': 'Quiz submission and answers deleted.'
        })


class DeleteAnswerView(LoginRequiredMixin, View):

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        submission_id = data.get('submission_id')
        question_number = data.get('question_number')

        try:
            quiz_submission = QuizSubmission.objects.get(id=submission_id)
        except QuizSubmission.DoesNotExist:
            return JsonResponse({
                'status': 'error',
                'message': 'Quiz submission not found'
            }, status=404)

        updated = Answer.objects.filter(
            quiz_submission=quiz_submission,
            question_number=question_number,
            active=True
        ).update(active=False)

        if updated == 0:
            return JsonResponse({
                'status': 'error',
                'message': 'Answer for question not found'
            }, status=404)

        return JsonResponse({
            'status': 'success',
            'message': 'All answers for question deleted'
        })


@csrf_exempt
def reset_test_db(request):
    if not settings.DEBUG:
        return JsonResponse({'error': 'Not allowed'}, status=403)
    from metricsmentor.main.management.commands.integrationserver import (
        reset_test_models
    )
    reset_test_models()
    return JsonResponse({'status': 'ok'})
