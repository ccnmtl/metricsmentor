from django.shortcuts import render
from django.views.generic.base import View


class Index(View):
    template_name = 'design/index.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)


class Simulation(View):
    template_name = 'design/simulation.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
