from django.conf.urls import patterns, include, url
from projects import views

urlpatterns = patterns('',
    url(r"^d3_initial", views.d3_initial, name="d3_initial"),
)
