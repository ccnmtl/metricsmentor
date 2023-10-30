# Django settings for metricsmentor project.
import os.path
from ctlsettings.shared import common
from courseaffils.columbia import CourseStringMapper

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
    'metricsmentor.main',
    'courseaffils',
    'lti_provider',
]

THUMBNAIL_SUBDIR = "thumbs"
LOGIN_REDIRECT_URL = "/"

ACCOUNT_ACTIVATION_DAYS = 7
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

LTI_TOOL_CONFIGURATION = {
    'title': 'Metrics Mentor',
    'description': 'Econometrics Simulations',
    'launch_url': 'lti/',
    'embed_url': '',
    'embed_icon_url': '',
    'embed_tool_id': '',
    'landing_url': '{}://{}/course/lti/{}/',
    'course_aware': True,
    'navigation': True,
    'new_tab': True,
    'frame_width': 1024,
    'frame_height': 1024
}

COURSEAFFILS_COURSESTRING_MAPPER = CourseStringMapper
