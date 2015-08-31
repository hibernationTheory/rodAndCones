import os
import shutil

from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.core.urlresolvers import reverse
from django.test.client import Client

BLOG_DEPLOY_DIR = settings.BLOG_DEPLOY_DIR
BLOG_DEPLOY_STATIC_DIR = settings.BLOG_DEPLOY_STATIC_DIR
BLOG_PAGES_PATH = settings.BLOG_PAGES_PATH

def get_pages():
	for name in os.listdir(BLOG_PAGES_PATH):
		if os.path.splitext(name)[1] == '.md':
			yield os.path.splitext(name)[0]

def x(deploy_dir=BLOG_DEPLOY_DIR):
	'''Request pages and build output'''
	if os.path.exists(deploy_dir):
		shutil.rmtree(deploy_dir)
	os.mkdir(deploy_dir)
	os.mkdir(BLOG_DEPLOY_STATIC_DIR)
	call_command('collectstatic', dry_run=False)
	#  --ignore admin --ignore startpage --ignore  project_deliberate --ignore threejs --ignore project_portfolio --ignore projects')
	client = Client()
	for page in get_pages():
		url = reverse('blog-post', kwargs={'title':page})
		#url = "blog/" + page
		print(url)
		response = client.get(url)
		print(response)



x()