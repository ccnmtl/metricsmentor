import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Create a superuser if it does not already exist'

    def handle(self, *args, **options):
        User = get_user_model()
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
            self.stdout.write(self.style.SUCCESS(
                'Superuser created successfully!'))
        else:
            self.stdout.write(self.style.NOTICE('Superuser already exists.'))
