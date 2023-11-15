#!/bin/sh

python manage.py migrate --noinput --settings=metricsmentor.settings_docker

gunicorn metricsmentor.wsgi:application --bind 0.0.0.0:8000 --settings=metricsmentor.settings_docker