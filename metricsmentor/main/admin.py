from django.contrib import admin
from metricsmentor.main.models import Graph, QuizSubmission, Answer


class GraphAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'simulation', 'created_at', 'updated_at')
    search_fields = ('user', 'course', 'simulation')
    list_filter = ('user', 'course', 'simulation')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


class QuizSubmissionAdmin(admin.ModelAdmin):
    list_display = ('graph', 'created_at', 'updated_at')
    search_fields = ('graph',)
    list_filter = ('graph',)
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


class AnswerAdmin(admin.ModelAdmin):
    list_display = (
        'quiz_submission',
        'question_number',
        'question_type',
        'selected_option',
        'is_correct',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'quiz_submission',
        'question_number',
        'question_type',
        'selected_option',
        'is_correct'
    )
    list_filter = (
        'quiz_submission',
        'question_number',
        'question_type',
        'selected_option',
        'is_correct'
    )
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')


admin.site.register(Graph, GraphAdmin)
admin.site.register(QuizSubmission, QuizSubmissionAdmin)
admin.site.register(Answer, AnswerAdmin)
