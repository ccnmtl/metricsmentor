import os
from metricsmentor.settings_shared import *  # noqa: F401,F403


# docker-compose db container
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_NAME'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        # 'HOST': 'host.docker.internal',
        # # use this for Mac and Windows when the Postgres
        # is running in another Docker container outside the network
        'HOST': 'db',  # use this for Linux when the Postgres is running
                       # in another Docker container inside the network
        'PORT': 5432,
    }
}
