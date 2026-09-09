#!/bin/sh

SETTINGS=metricsmentor.settings_docker
if [ "$ENVIRONMENT" = "production" ]; then
    SETTINGS=metricsmentor.settings_docker_production
fi

python manage.py migrate --noinput --settings=$SETTINGS

python manage.py collectstatic --noinput --settings=$SETTINGS

# Create Super User, will require DJANGO_SUPERUSER_EMAIL, DJANGO_SUPERUSER_USERNAME and DJANGO_SUPERUSER_PASSWORD in Environment Variables
if [ -n "$DJANGO_SUPERUSER_USERNAME" ]; then
    python manage.py create_superuser --settings=$SETTINGS
fi

export DJANGO_SETTINGS_MODULE=$SETTINGS

exec gunicorn metricsmentor.wsgi:application \
     --bind 0.0.0.0:8000 \
     --workers "${GUNICORN_WORKERS:-3}" \
     --timeout 120 \
     --no-control-socket \
     --access-logfile - \
     --error-logfile -
