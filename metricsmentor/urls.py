from django.urls import include, path, re_path
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
from django.views.static import serve
from django_cas_ng import views as cas_views
from metricsmentor.main import views


urlpatterns = [
    re_path(r'^accounts/', include('django.contrib.auth.urls')),

    path('admin/', admin.site.urls),

    path('accounts/', include('django.contrib.auth.urls')),
    path('cas/login', cas_views.LoginView.as_view(),
         name='cas_ng_login'),
    path('cas/logout', cas_views.LogoutView.as_view(),
         name='cas_ng_logout'),

    re_path(r'lti/', include('lti_provider.urls')),
    re_path(r'^course/lti/create/',
            views.LTICourseCreate.as_view(), name='lti-course-create'),
    re_path(r'^course/lti/(?P<context>\w[^/]*)/$',
            views.LTICourseSelector.as_view(), name='lti-course-select'),



    re_path('^$', views.CoursesView.as_view()),
    re_path(r'^course/(?P<pk>\d+)/simulations/',
            views.SimulationDashboardView.as_view(),
            name='simulation-dashboard-view'),

    path('_impersonate/', include('impersonate.urls')),
    path('stats/', TemplateView.as_view(template_name="stats.html")),
    path('smoketest/', include('smoketest.urls')),
    path('uploads/<str:path>',
         serve, {'document_root': settings.MEDIA_ROOT}),

    path('courses/', views.CoursesView.as_view(), name='course-list-view'),

    re_path(r'^course/(?P<pk>\d+)/$', views.CourseDetailView.as_view(),
            name='course-detail-view'),
    path('calc_regression/', views.calculate_regression,
         name='calculate_regression'),
    path('calc_multi_regression/', views.calculate_multiple_regression,
         name='calculate_multiple_regression'),
    path('calculate_pvalue/', views.calculate_pvalue,
         name='calculate_pvalue'),
    path('calculate_critical/', views.calculate_critical_value,
         name='calculate_critical_value'),
    re_path(r'^course/(?P<pk>\d+)/api/create-sub/$',
            views.CreateSubmission.as_view(),
            name='create_submission'),
    re_path('^contact/', include('contactus.urls')),
    path('save_answer/', views.SaveAnswer.as_view(), name='save_answer'),

]


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path(r'__debug__/', include(debug_toolbar.urls)),
    ]
