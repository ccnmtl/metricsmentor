#!/bin/sh

export DJANGO_SETTINGS_MODULE=metricsmentor.settings_docker

python manage.py migrate --noinput

gunicorn metricsmentor.wsgi:application --bind 0.0.0.0:8000
