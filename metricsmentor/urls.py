from django.urls import include, path, re_path
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
from django.views.static import serve
from django_cas_ng import views as cas_views
from metricsmentor.main import views

admin.autodiscover()


urlpatterns = [

     re_path(r'simulations/', views.SimulationDashboardView.as_view(),
             name='simulation-dashboard-view'),
     path('', views.IndexView.as_view()),
     path('admin/', admin.site.urls),

     path('accounts/', include('django.contrib.auth.urls')),
     path('cas/login', cas_views.LoginView.as_view(),
          name='cas_ng_login'),
     path('cas/logout', cas_views.LogoutView.as_view(),
          name='cas_ng_logout'),

     path('_impersonate/', include('impersonate.urls')),
     path('stats/', TemplateView.as_view(template_name="stats.html")),
     path('smoketest/', include('smoketest.urls')),
     path('uploads/<str:path>',
          serve, {'document_root': settings.MEDIA_ROOT}),
     path(r'lti/', include('lti_provider.urls')),
     re_path(r'^course/lti/create/$',
             views.LTICourseCreate.as_view(), name='lti-course-create'),
     re_path(r'^course/lti/(?P<context>\w[^/]*)/$',
             views.LTICourseSelector.as_view(), name='lti-course-select'),
     path('courses/', views.CoursesView.as_view(), name='course-list-view'),

     re_path(r'^course/(?P<pk>\d+)/$', views.CourseDetailView.as_view(),
             name='course-detail-view'),

]


if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path(r'__debug__/', include(debug_toolbar.urls)),
    ]
