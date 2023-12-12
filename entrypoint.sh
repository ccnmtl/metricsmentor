#!/bin/sh

python manage.py migrate --noinput --settings=metricsmentor.settings_docker

# Create Super User, will require DJANGO_SUPERUSER_EMAIL, DJANGO_SUPERUSER_USERNAME and DJANGO_SUPERUSER_PASSWORD in Environment Variables
python manage.py create_superuser

# gunicorn metricsmentor.wsgi:application --bind 0.0.0.0:8000 --settings=metricsmentor.settings_docker
python manage.py runserver --settings=metricsmentor.settings_docker 0.0.0.0:8000