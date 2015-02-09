from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse
from resource import linkData

def main(request):
	context = RequestContext(request)
	linkDataAll = linkData.main()
	context_dict = {"linkData":linkDataAll}

	return render_to_response("startpage/main.html", context_dict)