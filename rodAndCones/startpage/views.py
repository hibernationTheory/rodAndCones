import json
import os

from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse
from resource import linkData

CURR_DIR = os.path.dirname(__file__)
RESOURCES_DIR = os.path.join(CURR_DIR, "resource")
INDEX_DATA_FILE_PATH = os.path.join(RESOURCES_DIR, "indexData.json")

def main(request):
	context = RequestContext(request)
	linkDataAll = linkData.main()
	context_dict = {"linkData":linkDataAll}

	return render_to_response("startpage/main.html", context_dict)

def index(request):
	context = RequestContext(request)
	with open(INDEX_DATA_FILE_PATH, "r") as targetFile:
		context_dict = json.load(targetFile)

	return render_to_response("startpage/index.html", context_dict)