import json
import os

from django.core import serializers
from django.template import RequestContext
from django.shortcuts import render_to_response
from models import Topic


CURRENT_DIR = os.path.abspath(os.path.curdir)


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

	context_data = {"data":jsonDataList}
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
	"""serializes a single object"""
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