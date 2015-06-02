""" a script to populate the database using the all_data.json file """

import json
import os
import sys

CURRENT_DIR = os.path.dirname(__file__)
JSON_CONTENT_DATA = os.path.join(CURRENT_DIR, 'data_workflowy.json')
JSON_TECHNICAL_DATA = os.path.join(CURRENT_DIR, 'data_non_workflowy.json')
BASE_PATH = os.path.abspath(os.path.join(CURRENT_DIR, os.pardir, os.pardir, os.pardir, os.pardir, os.pardir))
DATABASE_PATH = os.path.join(BASE_PATH, 'database', 'database.db')


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rodAndCones.settings')
sys.path.insert(0, BASE_PATH)
from projects.models import Topic

def main():
	with open(JSON_CONTENT_DATA, 'r') as jsonFile:
		jsonContentData = json.load(jsonFile)

	with open(JSON_TECHNICAL_DATA, 'r') as jsonFile:
		jsonTechData = json.load(jsonFile)

	for techData in jsonTechData:
		jsonTopicData = None
		for contentData in jsonContentData:
			if contentData["name"].lower() == techData["short_name"].lower():
				jsonTopicData = contentData
		if not jsonTopicData:
			break

		topic = add_topic(name=techData["name"],
						  short_name=techData["short_name"],
						  tags=jsonTopicData["tags"],
						  color=techData["color"],
						  image_name=techData["image_name"],
						  summary=jsonTopicData["summary"],
						  categories=jsonTopicData["categories"],
						  description=jsonTopicData["description"],
						  competency = jsonTopicData["competency"],
						  reason = jsonTopicData["reason"],
						  rating = jsonTopicData["rating"],
						  status = jsonTopicData["status"],
						  plan = jsonTopicData["plan"],
						  dependencies = jsonTopicData["dependencies"],
						  related = jsonTopicData["related"],
						  resources = jsonTopicData["resources"],
						  links = jsonTopicData["links"]
						  )

	for t in Topic.objects.all():
		print "{0}".format(str(t))


def add_topic(name, short_name, tags, color, image_name, summary, categories, description):
	t = Topic.objects.get_or_create(
		name=name, 
		short_name=short_name, 
		tags=tags,
		color=color,
		image_name=image_name,
		summary=summary,
		categories=categories,
		description=description,
		competency=0,
		reason="",
		rating=0,
		status="",
		priority=0,
		dependencies="",
		related="",
		resources="",
		links = ""
		)[0]
	return t

# Start execution here!
if __name__ == '__main__':
	print "Starting the population script..."
	main()