from django.conf.urls import patterns, include, url
from projects import views

urlpatterns = patterns('',
    url(r"^d3_initial", views.d3_initial, name="d3_initial"),
    url(r"^project_d3_playground", views.project_d3_playground, name="project_d3_playground"),
    url(r"^project_portfolio", views.project_portfolio, name="project_portfolio"),
)
