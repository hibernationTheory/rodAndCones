import json
import os

from django.template import RequestContext
from django.shortcuts import render_to_response


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
	context_data = {}
	return render_to_response("projects/project_deliberate/index.html", context_data)