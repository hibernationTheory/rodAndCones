""" a script to populate the database using the all_data.json file """

import json
import os
import sys

CURRENT_DIR = os.path.dirname(__file__)
JSON_PATH = os.path.join(CURRENT_DIR, 'all_data.json')
BASE_PATH = os.path.abspath(os.path.join(CURRENT_DIR, os.pardir, os.pardir, os.pardir, os.pardir, os.pardir))
DATABASE_PATH = os.path.join(BASE_PATH, 'database', 'database.db')
#MODELS_PATH = os.path.join(BASE_PATH, 'projects')


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rodAndCones.settings')
sys.path.insert(0, BASE_PATH)
from projects.models import Topic

def main():
	with open(JSON_PATH, 'r') as jsonFile:
		jsonData = json.load(jsonFile)

	for data in jsonData:
		topic = add_topic(name=data["name"],
						  short_name=data["short_name"],
						  tags=data["tags"],
						  color=data["color"],
						  image_name=data["image_name"],
						  summary=data["summary"],
						  categories=data["categories"],
						  description=data["description"])
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
		reasoning="",
		rating=0,
		status="",
		priority=0,
		dependencies="",
		related="",
		resources=""
		)[0]
	return t

# Start execution here!
if __name__ == '__main__':
	print "Starting the population script..."
	main()