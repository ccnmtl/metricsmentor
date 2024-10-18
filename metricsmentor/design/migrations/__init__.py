from django.test import TestCase
from django.urls.base import reverse


class DesignAppViewTest(TestCase):
    def test_design_index(self):
        response = self.client.get(
            reverse('design-index')
        )
        self.assertEqual(response.status_code, 200)

    def test_design_simulation(self):
        response = self.client.get(
            reverse('design-simulation')
        )
        self.assertEqual(response.status_code, 200)
