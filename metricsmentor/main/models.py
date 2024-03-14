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


class Graph(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    simulation = models.IntegerField(choices=SIMULATIONS)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class QuizSubmission(models.Model):
    graph = models.ForeignKey(Graph, on_delete=models.CASCADE)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"QuizSubmission - {self.user.username} - {self.graph}"
