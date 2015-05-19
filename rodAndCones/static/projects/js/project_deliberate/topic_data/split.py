""" splits the given .json file into indivual json files when run """
import os
import json

CURRENT_DIR = os.path.abspath(os.path.curdir)
TARGET_FILENAME = "all_data.json"
TARGET_FILE = os.path.join(CURRENT_DIR, TARGET_FILENAME)

with open(TARGET_FILE, "r") as jsonFile:
    data = json.load(jsonFile)

for item in data:
    with open( os.path.join(CURRENT_DIR, "topic_" + item["short_name"]).lower() + ".json", "w") as itemFile:
        json.dump(item, itemFile, indent=4)