"""
module to merge self created technical data (that contains, img file locations, hex values) with the content data
that is imported from data_workflowy
"""

import json
import os

import opml_parser


import json
import os
import opml
from bs4 import BeautifulSoup as beaSoup

def get_topic_subdata(topic_content, name):
    subData = []

    if name == 'resources':
        subData = {}
        for content in topic_content:
            subData[content.text] = []
            for subContent in content:
                if len(subContent) >= 1: # there are links
                    subData[content.text].append({subContent.text:[link.text for link in subContent]})
                else:
                    subData[content.text].append(subContent.text)
        return subData

    if name == 'competency':
        return float(topic_content[0].text)

    if len(topic_content) == 0:
        return ""
    elif len(topic_content) == 1:
        return topic_content[0].text
    else:
        for content in topic_content:
            subData.append(content.text)
    return subData

def read_opml(target_file):
    outline = opml.parse(target_file)
    topics = outline[0]

    topic_data_all = []
    topic_content_subnames = [
        "category", "competency", "reason", "description", "summary", "rating", "status",
        "plan", "dependencies", "related", "tags", "resources", "links"
        ]

    counter = 1
    for topic in topics:
        topic_title = topic.text
        topic_data_current = {}
        topic_data_current["name"] = topic_title
        topic_content_subnames_found = []
        for topic_content in topic:
            for topic_content_subname in topic_content_subnames:
                if topic_content.text.lower() == topic_content_subname:
                    subdata = get_topic_subdata(topic_content, topic_content_subname)
                    topic_data_current[topic_content_subname] = subdata
                    topic_content_subnames_found.append(topic_content_subname.title())

        # generated data
        topic_data_current["index"] = topic_content_subnames_found
        topic_data_current["priority"] = counter
        #
        counter += 1
        topic_data_all.append(topic_data_current)

    return topic_data_all

def write_opml_data(target_file_path, data):
    with open(target_file_path, "w") as target_file:
        json.dump(data, target_file, indent=4)

def process_opml_data():
    CURRENT_DIR = os.path.dirname(__file__)
    TARGET_FILE = os.path.join(CURRENT_DIR, "data_workflowy.opml")
    TARGET_WRITE_FILE = os.path.join(CURRENT_DIR, "data_workflowy.json")

    topic_data = read_opml(TARGET_FILE)
    write_opml_data(TARGET_WRITE_FILE, topic_data)

def merge_json_data(data_01, data_02):
    """
    merges the json data inside two given file paths. data_01 is the content data
    data_02 is the technical data.
    """
    with open(data_01, 'r') as data_file_01:
        data_01 = json.load(data_file_01)

    with open(data_02, 'r') as data_file_02:
        data_02 = json.load(data_file_02)

    data_merge = {}

    for datum_02 in data_02:
        for datum_01 in data_01:
            if datum_01["name"].lower() == datum_02["short_name"].lower():
                datum_01.update(datum_02)
                data_merge[datum_02["short_name"].lower()] = datum_01
                break

    return data_merge

def get_viz_data(data):
    viz_data_all = []
    for key_value in data.iteritems():
        print(key_value)
        value = key_value[1]
        viz_data = {}
        viz_data["category"] = value["category"]
        viz_data["priority"] = value["priority"]
        viz_data["competency"] = value.get("competency", 1)
        viz_data["name"] = value["name"]
        viz_data["color"] = value["color"]
        viz_data_all.append(viz_data)
    return viz_data_all

def main():
    process_opml_data()

    CURRENT_DIR = os.path.dirname(__file__)
    TARGET_FILE_01 = os.path.join(CURRENT_DIR, "data_workflowy.json")
    TARGET_FILE_02 = os.path.join(CURRENT_DIR, "data_non_workflowy.json")
    OUTPUT_FILE = os.path.join(CURRENT_DIR, "data.json")
    VIZ_OUTPUT_FILE = os.path.abspath(os.path.join(CURRENT_DIR, os.pardir, os.pardir, 
                      "static", "projects", "js", "project_deliberate", "data.json"))

    merged_data = merge_json_data(TARGET_FILE_01, TARGET_FILE_02)
    with open(OUTPUT_FILE, "w") as output:
        json.dump(merged_data, output, indent=4)

    viz_data = get_viz_data(merged_data)

    with open(VIZ_OUTPUT_FILE, "w") as output:
        json.dump(viz_data, output, indent=4)

if __name__ == "__main__":
    main()