from django.db import models
from courseaffils.models import Course
from django.contrib.auth.models import User

SIMULATIONS = [
    (1, 'Simulation 1'),
    (2, 'Simulation 2'),
    (3, 'Simulation 3'),
    (4, 'Simulation 4'),
    (5, 'Simulation 5'),
    (6, 'Simulation 6'),
    (7, 'Simulation 7')
]


class QuizSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    simulation = models.IntegerField(choices=SIMULATIONS)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)


class Answer(models.Model):
    quiz_submission = models.ForeignKey(QuizSubmission,
                                        on_delete=models.CASCADE)
    question_number = models.IntegerField()
    question_type = models.CharField(max_length=50)
    selected_option = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)


class SimulationVisibility(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    simulation = models.IntegerField(choices=SIMULATIONS)
    is_visible = models.BooleanField(default=False)

    class Meta:
        unique_together = ('course', 'simulation')
        verbose_name_plural = "Simulation Visibilities"

    def __str__(self):
        return (
            f"{self.course} - {self.get_simulation_display()} - "
            f"{'Visible' if self.is_visible else 'Hidden'}"
        )
