# Django settings for metricsmentor project.
import os.path
from ctlsettings.shared import common
from courseaffils.columbia import CourseStringMapper
import sys

project = 'metricsmentor'
base = os.path.dirname(__file__)

locals().update(common(project=project, base=base))

PROJECT_APPS = [
    'metricsmentor.main',
]

USE_TZ = True

INSTALLED_APPS += [  # noqa
    'django_bootstrap5',
    'django_extensions',
    'metricsmentor',
    'metricsmentor.main',
    'courseaffils',
    'lti_provider',
    'contactus',
]

MIDDLEWARE += [  # noqa
    'django.middleware.csrf.CsrfViewMiddleware',
]

THUMBNAIL_SUBDIR = "thumbs"
LOGIN_REDIRECT_URL = "/"

ALLOWED_HOSTS += [  # noqa
    '*'
]

ACCOUNT_ACTIVATION_DAYS = 7
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

AUTHENTICATION_BACKENDS += [  # noqa
    'lti_provider.auth.LTIBackend',
]

SERVER_EMAIL = 'automated@mail.ctl.columbia.edu'
CONTACT_US_EMAIL = 'ctl-metricsmentor@columbia.edu'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_PORT = os.environ.get('EMAIL_PORT')
EMAIL_HOST_USER = os.environ.get('SES_USERNAME')
EMAIL_HOST_PASSWORD = os.environ.get('SES_PASSWORD')


LTI_TOOL_CONFIGURATION = {
    'title': 'Metrics Mentor',
    'description': 'Econometrics Simulations',
    'launch_url': 'lti/',
    'embed_url': '',
    'embed_icon_url': '',
    'embed_tool_id': '',
    'landing_url': '{}://{}/course/lti/{}/',
    'course_aware': True,
    'course_navigation': True,
    'new_tab': True,
    'frame_width': 1024,
    'frame_height': 1024,
    'allow_ta_access': True
}

PYLTI_CONFIG = {
    'consumers': {
        os.environ.get('PYLTI_CONSUMER'): {
            'secret': os.environ.get('PYLTI_SECRET')
        }
    }
}

COURSEAFFILS_COURSESTRING_MAPPER = CourseStringMapper

if 'integrationserver' in sys.argv:
    ENVIRONMENT = 'testing'
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    PASSWORD_HASHERS = (
        'django.contrib.auth.hashers.MD5PasswordHasher',
    )

    DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': ':memory:',
                'HOST': '',
                'PORT': '',
                'USER': '',
                'PASSWORD': '',
                'ATOMIC_REQUESTS': True,
            }
        }
