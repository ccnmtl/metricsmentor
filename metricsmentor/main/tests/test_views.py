from django.test import TestCase
from metricsmentor.main.tests.factories import CourseTestMixin
from metricsmentor.main.models import Graph
from django.urls.base import reverse


class BasicTest(TestCase):
    def test_root(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 302)

    def test_smoketest(self):
        response = self.client.get("/smoketest/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'PASS')


class SaveSim1GraphViewTest(CourseTestMixin, TestCase):
    def test_save_sim1_graph(self):
        self.setup_course()
        self.client.force_login(self.superuser)
        data = {
            'appRvalue': 0.5817697100267285,
            'correlation': 0.5,
            'hypothesizedSlope': 0,
            'intercept': 40.09861273560345,
            'N': 50,
            'seed': 'seedString',
            'slope': 0.5562578330177294,
            'stderror': 0.11224933685759263,
            'tvalue': '4.956'
        }
        self.url = reverse(
            'save_sim1_graph',
            kwargs={'pk': self.registrar_course.pk})
        response = self.client.post(self.url, data={'data': data},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 201)
        graph = Graph.objects.get(course=self.registrar_course,
                                  simulation=1,
                                  user=self.superuser)
        self.assertEqual(graph.data, data)
