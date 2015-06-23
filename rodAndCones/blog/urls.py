from django.conf.urls import patterns, include, url
from blog import views

urlpatterns = patterns('',
	url(r"^$", views.index, name="index"),
	url(r"^(?P<name>\w+/$)", views.page, name="page"),
    #url(r"^topics/(?P<name>\w+/$)", views.blog_topic, name="blog_topic"),
)
