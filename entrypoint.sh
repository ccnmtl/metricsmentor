#!/bin/sh

python manage.py migrate --noinput --settings=metricsmentor.settings_docker

gunicorn metricsmentor.wsgi:application --settings=metricsmentor.settings_docker --bind 0.0.0.0:8000
