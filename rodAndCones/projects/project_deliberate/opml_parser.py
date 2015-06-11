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
    topic_content_subnames = ["reason", "description", "summary", "rating", "status",
                      "plan", "dependencies", "related", "tags", "resources", "links"]

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

        topic_data_current["index"] = topic_content_subnames_found
        topic_data_all.append(topic_data_current)

    return topic_data_all

def write_opml_data(target_file_path, data):
    with open(target_file_path, "w") as target_file:
        json.dump(data, target_file, indent=4)

def main():
    CURRENT_DIR = os.path.dirname(__file__)
    """
    if not CURRENT_DIR: # not sure why this is happening will debug #todo
        CURRENT_DIR = os.path.join(os.path.abspath(os.pardir), "topic_data")
    """
    TARGET_FILE = os.path.join(CURRENT_DIR, "data_workflowy.opml")
    TARGET_WRITE_FILE = os.path.join(CURRENT_DIR, "data_workflowy.json")

    topic_data = read_opml(TARGET_FILE)
    write_opml_data(TARGET_WRITE_FILE, topic_data)

if __name__ == "__main__":
    main()