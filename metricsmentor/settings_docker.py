import os
from metricsmentor.settings_shared import *  # noqa: F401,F403


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
