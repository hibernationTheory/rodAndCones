import json
import os

from django.core import serializers
from django.template import RequestContext
from django.shortcuts import render_to_response
from models import Topic


CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
PROJECT_NAME = 'core_competencies'

def core_competencies(request):
	jsonDataPath = os.path.join(CURRENT_DIR, "data", "data.json")
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
	return render_to_response("%s/index.html" %PROJECT_NAME, context_data)

def core_competencies_topic(request, name=""):
	jsonDataPath = os.path.join(CURRENT_DIR, "data", "data.json")
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

	return render_to_response("%s/topicPage.html" %PROJECT_NAME, context_data)

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