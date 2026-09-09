import os
from metricsmentor.settings_shared import *  # noqa: F401,F403
from ctlsettings.production import common, init_sentry


locals().update(
    common(
        project=project,  # noqa: F405
        base=base,  # noqa: F405
        STATIC_ROOT=STATIC_ROOT,  # noqa: F405
        INSTALLED_APPS=INSTALLED_APPS,  # noqa: F405
        s3static=True,
    ))


# docker-compose db container
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'metricsmentor',
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': os.environ.get('HOST'),
        'PORT': 5432,
    }
}


ALLOWED_HOSTS += [  # noqa: F405
    '*',
]


SENTRY_DSN = os.environ.get('SENTRY_DSN')
SENTRY_KEY = os.environ.get('SENTRY_KEY')

if SENTRY_DSN:
    init_sentry(SENTRY_DSN)
