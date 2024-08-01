from django.test import TestCase
from django.urls import reverse
from metricsmentor.main.tests.factories import CourseTestMixin
from metricsmentor.main.models import QuizSubmission


class BasicTest(TestCase):
    def test_root(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 302)

    def test_smoketest(self):
        response = self.client.get("/smoketest/")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'PASS')


class CreateSubmissionViewTest(CourseTestMixin, TestCase):
    def test_create_submission(self):
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
        payload = {
            'simulation': 1,
            'data': data
        }
        url = reverse('create_submission', kwargs={
            'pk': self.registrar_course.pk})
        response = self.client.post(
            url, data=payload, content_type='application/json')
        self.assertEqual(response.status_code, 201)

        quiz_submission = QuizSubmission.objects.get(
            course=self.registrar_course, simulation=1, user=self.superuser)
        self.assertEqual(quiz_submission.data, data)


class SaveAnswerViewTest(CourseTestMixin, TestCase):
    def test_save_answer(self):
        self.setup_course()
        self.client.force_login(self.superuser)

        # Create a QuizSubmission object
        quiz_submission = QuizSubmission.objects.create(
            user=self.superuser,
            simulation=1,
            data={'dummy': 'data'},
            course=self.registrar_course
        )

        # Prepare the answer data
        answer_data = {
            'submission_id': quiz_submission.id,
            'question_number': 1,
            'question_type': 'multiple_choice',
            'selected_option': 'A',
            'is_correct': True,
            'additional_data': {'example_key': 'example_value'}
        }

        url = reverse('save_answer')
        response = self.client.post(url, data=answer_data,
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Verify that the answer was saved correctly
        quiz_submission.refresh_from_db()
        self.assertEqual(quiz_submission.answer_set.count(), 1)
        answer = quiz_submission.answer_set.first()
        self.assertEqual(answer.question_number, 1)
        self.assertEqual(answer.question_type, 'multiple_choice')
        self.assertEqual(answer.selected_option, 'A')
        self.assertEqual(answer.is_correct, True)
        self.assertEqual(answer.data, {'example_key': 'example_value'})
