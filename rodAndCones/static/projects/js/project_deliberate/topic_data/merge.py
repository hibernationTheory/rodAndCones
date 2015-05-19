""" merges all the .json files in the directory under a single .json when run """
import os
import json

CURRENT_DIR = os.path.abspath(os.path.curdir)
TARGET_FILENAME = "all_data.json"

all_content = os.listdir(CURRENT_DIR)
counter = 0
allData = ""

for content in all_content:
    if content.endswith(".json") and content.startswith("topic"):
        with open(os.path.join(CURRENT_DIR, content), "r") as jsonFile:
            data = jsonFile.read()
            if counter != 0:
                allData = allData +  "," + data
            else:
                allData = allData + data
            counter += 1

if allData:
    allData = "[" + allData + "]"
    allData = json.loads(allData)
    with open(os.path.join(CURRENT_DIR, TARGET_FILENAME), "w") as jsonFile:
        json.dump(allData, jsonFile, indent=4)
        

