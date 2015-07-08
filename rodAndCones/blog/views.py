import json
import markdown
import os
import sys
import time
from HTMLParser import HTMLParser


CURRENT_DIR = os.getcwdu()
PARENT_DIR = os.path.abspath(os.path.join(CURRENT_DIR, os.pardir))

if PARENT_DIR not in sys.path:
	sys.path.insert(0, PARENT_DIR)


from django.conf import settings
os.environ['DJANGO_SETTINGS_MODULE'] = 'rodAndCones.settings'

from django.core import serializers
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import Http404
from django.template import RequestContext
from django.shortcuts import render_to_response



from bs4 import BeautifulSoup

PAGES_DIR = settings.BLOG_PAGES_PATH
PAGE_DATA_FILE = os.path.join(PAGES_DIR, 'page_data.json')

def get_all_pages(pages_dir, page_data_file):
	unsorted_file_names = os.listdir(pages_dir)
	unsorted_file_names_full_path = [os.path.join(pages_dir, file_path) for file_path in unsorted_file_names]
	file_names = sorted(unsorted_file_names_full_path, key=os.path.getctime)

	categories = {}

	allowed_extensions = ['.md']
	content = []
	for path in file_names:
		name = os.path.split(path)[1]
		nameExtension = os.path.splitext(name)[1]
		if nameExtension not in allowed_extensions:
			continue
		file_path = os.path.join(pages_dir, name)
		content_data = generate_page_data(name, page_data_file, pages_dir)
		content.append(content_data)

		category_name = content_data["category"]

		if not categories.get(category_name, None):
			categories[category_name] = []
		categories[category_name].append({"name":content_data["name"], "title":content_data["title"]})



	content.append(categories)
	print(content)
	return content

def convert_filename_to_title(name):
	title = name.replace('_', ' ').title()
	basename = os.path.splitext(title)[0]
	return basename

def determine_post_category(name):
	category = 'opinion'
	if name.startswith('_'):
		if name.startswith('_p_'):
			category = 'passage'
		elif name.startswith('_q_'):
			category = 'quote'
		else:
			category = 'opinion'
	return category

def generate_page_data(name, page_data_file, pages_dir):
	"""get or generate all the data for the view"""
	featured = False
	content_data = {}
	nameBase = os.path.splitext(name)[0]
	file_full_path = os.path.join(pages_dir, name)

	with open(page_data_file, 'r') as pageDataFile:
		pageData = json.load(pageDataFile)

	if pageData["featured"] == nameBase:
		featured = True

	page_content = get_page_content_or_404(name, pages_dir)
	content_data['name'] = nameBase
	content_data['category'] = determine_post_category(nameBase)
	content_data['content'] = page_content
	content_data['date'] = time.ctime(os.path.getctime(file_full_path))
	content_data['title'] = extract_html_text_from_content(page_content, 'h1')
	content_data['subtitle'] = extract_html_text_from_content(page_content, 'h2')
	if featured:
		content_data['featured'] = 'true'
		content_data['title_featured'] = content_data['title']
		content_data['subtitle_featured'] = content_data['subtitle']
 
	return content_data

def extract_html_text_from_content(content, element):
	soup = BeautifulSoup(content)
	soup_el = soup.find_all(element)
	if len(soup_el) == 0:
		print('given element doesn\'t exist in the file!')
		return ''
	else:
		soup_el = soup_el[0]

	text = ''
	if len(soup_el.contents) == 0:
		print('no content for the given element')
		return text
	else:
		text = soup_el.contents[0]

	return text

def get_page_content_or_404(name, pages_dir):
	try:
		file_path = os.path.join(pages_dir, name)
	except ValueError:
		raise Http404('Page Not Found')
	else:
		if not os.path.exists(file_path):
			raise Http404('Page Not Found')

	with open(file_path, 'r') as f:
		page_string = f.read()

	html = markdown.markdown(page_string)
	return html

def index(request, pagenum=1, pages_dir=PAGES_DIR, page_data_file=PAGE_DATA_FILE):
	page_data = get_all_pages(pages_dir, page_data_file)
	#print(page_data)
	paginated_page_data = Paginator(page_data, 3)
	page = paginated_page_data.page(pagenum)

	content = {'page_data':page}
	return render_to_response('blog/index.html', content)

def post_page(request, title, pages_dir=PAGES_DIR, page_data_file=PAGE_DATA_FILE):
	if title.endswith('/'):
		title = title[:-1]
	file_title = '{}.md'.format(title)
	page_content = generate_page_data(file_title, page_data_file, pages_dir)
	data = {'data':page_content}
	print(data)
	return render_to_response('blog/post_page.html', data)