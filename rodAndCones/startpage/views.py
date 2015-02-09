from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse

def main(request):
  return render_to_response("startpage/main.html")