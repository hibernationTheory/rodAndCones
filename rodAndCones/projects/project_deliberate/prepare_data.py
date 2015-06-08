"""
module to merge self created technical data (that contains, img file locations, hex values) with the content data
that is imported from data_workflowy
"""

import json
import os

import opml_parser

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

def main():
    opml_parser.main()

    CURRENT_DIR = os.path.dirname(__file__)
    TARGET_FILE_01 = os.path.join(CURRENT_DIR, "data_workflowy.json")
    TARGET_FILE_02 = os.path.join(CURRENT_DIR, "data_non_workflowy.json")
    OUTPUT_FILE = os.path.join(CURRENT_DIR, "data.json")

    merged_data = merge_json_data(TARGET_FILE_01, TARGET_FILE_02)
    with open(OUTPUT_FILE, "w") as output:
        json.dump(merged_data, output, indent=4)

if __name__ == "__main__":
    main()