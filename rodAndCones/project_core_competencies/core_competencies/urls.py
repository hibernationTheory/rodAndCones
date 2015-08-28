from django.conf.urls import patterns, include, url
from . import views

urlpatterns = patterns('',
    url(r"^topics/(?P<name>\w+/$)", views.core_competencies_topic, name="core_competencies"),
    url(r"^$", views.core_competencies, name="core_competencies"),
)
