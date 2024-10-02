from django.test import TestCase
from django.contrib.auth.models import User
from metricsmentor.main.models import QuizSubmission, Answer
from metricsmentor.main.tests.factories import CourseTestMixin


class QuizSubmissionModelTest(CourseTestMixin, TestCase):
    def setUp(self):
        self.setup_course()
        self.user = User.objects.create_user(username='testuser',
                                             password='12345')

    def test_create_quiz_submission(self):
        quiz_submission = QuizSubmission.objects.create(
            user=self.user,
            course=self.registrar_course,
            simulation=1,
            data={'key': 'value'},
            active=True
        )
        self.assertEqual(quiz_submission.user, self.user)
        self.assertEqual(quiz_submission.course, self.registrar_course)
        self.assertEqual(quiz_submission.simulation, 1)
        self.assertEqual(quiz_submission.data, {'key': 'value'})
        self.assertTrue(quiz_submission.active)


class AnswerModelTest(CourseTestMixin, TestCase):
    def setUp(self):
        self.setup_course()
        self.user = User.objects.create_user(username='testuser',
                                             password='12345')
        self.quiz_submission = QuizSubmission.objects.create(
            user=self.user,
            course=self.registrar_course,
            simulation=1,
            data={'key': 'value'},
            active=True
        )

    def test_create_answer(self):
        answer = Answer.objects.create(
            quiz_submission=self.quiz_submission,
            question_number=1,
            question_type='multiple_choice',
            selected_option='Option A',
            is_correct=True,
            data={'key': 'value'},
            active=True
        )
        self.assertEqual(answer.quiz_submission, self.quiz_submission)
        self.assertEqual(answer.question_number, 1)
        self.assertEqual(answer.question_type, 'multiple_choice')
        self.assertEqual(answer.selected_option, 'Option A')
        self.assertTrue(answer.is_correct)
        self.assertEqual(answer.data, {'key': 'value'})
        self.assertTrue(answer.active)
