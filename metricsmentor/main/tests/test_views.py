from django.test import TestCase
from django.urls import reverse
import json
from metricsmentor.main.tests.factories import CourseTestMixin
from metricsmentor.main.models import QuizSubmission, Answer


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

        quiz_submission = QuizSubmission.objects.create(
            user=self.superuser,
            simulation=1,
            data={'dummy': 'data'},
            course=self.registrar_course
        )

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

        quiz_submission.refresh_from_db()
        self.assertEqual(quiz_submission.answer_set.count(), 1)
        answer = quiz_submission.answer_set.first()
        self.assertEqual(answer.question_number, 1)
        self.assertEqual(answer.question_type, 'multiple_choice')
        self.assertEqual(answer.selected_option, 'A')
        self.assertEqual(answer.is_correct, True)
        self.assertEqual(answer.data, {'example_key': 'example_value'})


class GetQuizViewTest(CourseTestMixin, TestCase):
    def test_get_quiz_view(self):
        self.setup_course()
        self.client.force_login(self.superuser)

        quiz_submission = QuizSubmission.objects.create(
            user=self.superuser,
            simulation=1,
            data={'dummy': 'data'},
            course=self.registrar_course,
            active=True
        )

        Answer.objects.create(
            quiz_submission=quiz_submission,
            question_number=1,
            question_type='multiple_choice',
            selected_option='A',
            is_correct=True,
            data={'example_key': 'example_value'},
            active=True
        )

        Answer.objects.create(
            quiz_submission=quiz_submission,
            question_number=2,
            question_type='multiple_choice',
            selected_option='B',
            is_correct=False,
            data={'example_key': 'another_value'},
            active=True
        )

        url = reverse('get_quiz', kwargs={'pk': self.registrar_course.pk})
        response = self.client.get(url, {'simulation_id': 1})

        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)

        # Verify that the response contains the expected answer data
        self.assertIn('answers', response_data)
        self.assertEqual(len(response_data['answers']), 2)

        # Verify the content of each answer
        for answer_data in response_data['answers']:
            self.assertIn('question_number', answer_data)
            self.assertIn('question_type', answer_data)
            self.assertIn('selected_option', answer_data)
            self.assertIn('is_correct', answer_data)
            self.assertIn('data', answer_data)

    def test_get_quiz_view_no_active_submission(self):
        self.setup_course()
        self.client.force_login(self.superuser)

        # No active submission should return a 404 response
        url = reverse('get_quiz', kwargs={'pk': self.registrar_course.pk})
        response = self.client.get(url, {'simulation_id': 1})
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertEqual(response_data['answers'], [])
        self.assertEqual(response_data['submission_id'], None)


class DeleteQuizSubmissionViewTest(CourseTestMixin, TestCase):
    def test_delete_quiz_submission(self):
        self.setup_course()
        self.client.force_login(self.superuser)

        # Create a QuizSubmission object
        quiz_submission = QuizSubmission.objects.create(
            user=self.superuser,
            simulation=1,
            data={'dummy': 'data'},
            course=self.registrar_course,
            active=True
        )

        # Create associated active answers
        Answer.objects.create(
            quiz_submission=quiz_submission,
            question_number=1,
            question_type='multiple_choice',
            selected_option='A',
            is_correct=True,
            data={'example_key': 'example_value'},
            active=True
        )

        url = reverse('delete_quiz')
        response = self.client.post(
            url,
            data=json.dumps({'submission_id': quiz_submission.id}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertEqual(response_data['status'], 'success')
        self.assertEqual(response_data['message'],
                         'Quiz submission and answers deleted.')

        quiz_submission.refresh_from_db()
        self.assertFalse(quiz_submission.active)

        for answer in quiz_submission.answer_set.all():
            self.assertFalse(answer.active)

    def test_delete_quiz_submission_not_found(self):
        self.setup_course()
        self.client.force_login(self.superuser)

        url = reverse('delete_quiz')
        response = self.client.post(
            url,
            data=json.dumps({'submission_id': 999}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 404)
        response_data = json.loads(response.content)
        self.assertEqual(response_data['status'], 'error')
        self.assertEqual(response_data['message'], 'Quiz submission not found')


class DeleteAnswerViewTest(CourseTestMixin, TestCase):
    def setUp(self):
        self.setup_course()
        self.client.force_login(self.superuser)

        self.quiz_submission = QuizSubmission.objects.create(
            user=self.superuser,
            simulation=1,
            data={'dummy': 'data'},
            course=self.registrar_course,
            active=True
        )

        self.answer = Answer.objects.create(
            quiz_submission=self.quiz_submission,
            question_number=1,
            question_type='multiple_choice',
            selected_option='A',
            is_correct=True,
            data={'example_key': 'example_value'},
            active=True
        )

    def test_delete_answer(self):
        url = reverse('delete_answer')
        response = self.client.post(
            url,
            data=json.dumps({
                'submission_id': self.quiz_submission.id,
                'question_number': 1
            }),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content)
        self.assertEqual(response_data['status'], 'success')
        self.assertEqual(response_data['message'],
                         'Answer for question deleted')
        self.answer.refresh_from_db()
        self.assertFalse(self.answer.active)

    def test_delete_answer_not_found(self):
        url = reverse('delete_answer')
        response = self.client.post(
            url,
            data=json.dumps({
                'submission_id': self.quiz_submission.id,
                'question_number': 999
            }),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 404)
        response_data = json.loads(response.content)
        self.assertEqual(response_data['status'], 'error')
        self.assertEqual(response_data['message'],
                         'Answer for question not found')

    def test_delete_submission_not_found(self):
        url = reverse('delete_answer')
        response = self.client.post(
            url,
            data=json.dumps({
                'submission_id': 999,
                'question_number': 1
            }),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, 404)
        response_data = json.loads(response.content)
        self.assertEqual(response_data['status'], 'error')
        self.assertEqual(response_data['message'], 'Quiz submission not found')
