import json
import markdown
import os
import time
from HTMLParser import HTMLParser

from django.core import serializers
from django.http import Http404
from django.template import RequestContext
from django.shortcuts import render_to_response

from bs4 import BeautifulSoup

CURRENT_DIR = os.path.abspath(os.path.curdir)
PAGES_DIR = os.path.join(CURRENT_DIR, 'blog', 'pages')
PAGE_DATA_FILE = os.path.join(PAGES_DIR, 'page_data.json')


def get_all_pages(pages_dir, page_data_file):
	file_names = os.listdir(pages_dir)
	allowed_extensions = ['.md']
	content = []
	for name in file_names:
		nameExtension = os.path.splitext(name)[1]
		if nameExtension not in allowed_extensions:
			continue
		file_path = os.path.join(pages_dir, name)
		content_data = generate_page_data(name, page_data_file, pages_dir)
		content.append(content_data)

	print(content)
	return content

def convert_filename_to_title(name):
	title = name.replace('_', ' ').title()
	basename = os.path.splitext(title)[0]
	return basename

def generate_page_data(name, page_data_file, pages_dir):
	content_data = {}
	with open(page_data_file, 'r') as pageDataFile:
		pageData = json.load(pageDataFile)

	for item in pageData:
		if item['name'] == name:
			content_data['category'] = item['category']

	page_content = get_page_content_or_404(name, pages_dir)
	content_data['content'] = page_content
	content_data['date'] = time.ctime(os.path.getctime(pages_dir))
	content_data['title'] = extract_html_text_from_content(page_content, 'h1')
	content_data['subtitle'] = extract_html_text_from_content(page_content, 'h2')

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
		print(file_path)
	except ValueError:
		raise Http404('Page Not Found')
	else:
		if not os.path.exists(file_path):
			raise Http404('Page Not Found')

	with open(file_path, 'r') as f:
		page_string = f.read()

	html = markdown.markdown(page_string)
	return html

def index(request, pages_dir=PAGES_DIR, page_data_file=PAGE_DATA_FILE):
	page_data = get_all_pages(pages_dir, page_data_file)
	content = {'page_data':page_data}
	return render_to_response('blog/index.html', content)

def page(request, name='index'):
	if name.endswith('/'):
		name = name[:-1]
	file_name = '{}.md'.format(name)
	page_content = get_page_content_or_404(file_name, pages_dir)
	data = {'data':page_content}
	return render_to_response('blog/post_page.html', data)

"""
def d3_initial(request):
	#context = RequestContext(request)
	return render_to_response("projects/d3_initial.html")

def project_d3_playground(request):
	#context = RequestContext(request)
	jsonDataPath = os.path.join(CURRENT_DIR, "projects", "project_d3_playground", "project_data.json")
	with open(jsonDataPath) as jsonFile:
		jsonData = json.load(jsonFile)

	projectsData = []
	for i in range(0, len(jsonData)):
		currData = jsonData[str(i)]
		projectsData.append(currData)

	context_data = {"projects" :projectsData}
	return render_to_response("projects/project_d3_playground/main.html", context_data)

def project_portfolio(request):
	jsonDataPath = os.path.join(CURRENT_DIR, "projects", "project_portfolio", "project_data.json")
	with open(jsonDataPath) as jsonFile:
		jsonData = json.load(jsonFile)

	projectsData = []
	for i in range(0, len(jsonData)):
		currData = jsonData[str(i)]
		projectsData.append(currData)

	#context = RequestContext(request)
	context_data = {"projects" :projectsData}
	return render_to_response("projects/project_portfolio.html", context_data)

def project_threejs_playground(request, var):
	context_data = {}
	return render_to_response("projects/project_threejs_playground/%s.html" %var, context_data)

def project_deliberate(request):
	jsonDataPath = os.path.join(CURRENT_DIR, "projects", "project_deliberate", "data.json")
	with open(jsonDataPath) as jsonFile:
		jsonData = json.load(jsonFile)

	jsonDataList = []
	jsonDataListTemp = []

	for item in jsonData.iteritems():
		jsonDataListTemp.append([item[0].lower(), item[1]])
	jsonDataListTemp.sort()

	jsonDataList = [i[1] for i in jsonDataListTemp]
	categories = list(set([i["category"] for i in jsonDataList]))
	categories.sort()
	print(categories)

	context_data = {"data":jsonDataList, "categories":categories}
	return render_to_response("projects/project_deliberate/index.html", context_data)

def project_deliberate_topic(request, name=""):
	jsonDataPath = os.path.join(CURRENT_DIR, "projects", "project_deliberate", "data.json")
	with open(jsonDataPath) as jsonFile:
		jsonData = json.load(jsonFile)
	context_data = {}

	if name:
		if name.endswith("/"):
			name = name[:-1]
		topicData = jsonData.get(name, None)
		if topicData is None:
			context_data = {}
		else:
			context_data['obj_data'] = topicData

	return render_to_response("projects/project_deliberate/topicPage.html", context_data)

def get_serialized_data_from_object(obj, **kwargs):
	'''serializes a single object'''
	print "\nfunc get_serialized_data"
	obj = [obj]
	objSerialized = serializers.serialize("json", obj)
	jsonDecoded = json.loads(objSerialized)
	if not jsonDecoded:
		return None
	jsonDecoded = jsonDecoded[0]
	if kwargs:
		jsonDecoded.update(kwargs)
	jsonEncoded = json.dumps(jsonDecoded)
	return jsonEncoded
"""