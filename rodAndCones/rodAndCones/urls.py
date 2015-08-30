from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'rodAndCones.views.home', name='home'),
    # url(r'^rodAndCones/', include('rodAndCones.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    # url(r'^$', 'startpage.views.index', name='index'),
    url(r'^main$', 'startpage.views.main', name='main'),
    #url(r'^projects/', include('projects.urls')),
    url(r'^blog/', include('blog.blog.urls')),
    url(r'^core_competencies/', include('project_core_competencies.core_competencies.urls')),
)
