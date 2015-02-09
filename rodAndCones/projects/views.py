from django.template import RequestContext
from django.shortcuts import render_to_response

def d3_initial(request):
	#context = RequestContext(request)
	#context_dict = {"boldmessage" : this will be a bold message}
	return render_to_response("projects/d3_initial.html")