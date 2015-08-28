from django.conf.urls import patterns, include, url
from . import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'project__core_competencies.views.home', name='home'),
    # url(r'^project__core_competencies/', include('project__core_competencies.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^%s/' % settings.PROJECT_NAME, include('%s.urls' %settings.PROJECT_NAME), name=settings.PROJECT_NAME),
)
