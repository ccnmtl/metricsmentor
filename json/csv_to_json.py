import csv
import json
import os
import re
import sys


# Path: local_dev/csv_to_json.py
def main():
    """Compile all CSV files in a given directory into a single JSON file."""
    # Set up the files
    dir = sys.argv[1]
    dest = sys.argv[2] if len(sys.argv) > 2 else 'json'
    with open(dest + '/datasets.json', 'w') as jsfile:
        result = {}
        for file in os.listdir(dir):
            if re.match(r'.*\.csv', file):
                with open(dir + '/' + file, encoding='utf-8-sig') as csvfile:
                    filename = file.split('.')[0].lower()
                    result[filename] = {}
                    reader = csv.DictReader(csvfile)
                    for field in reader.fieldnames:
                        result[filename][field] = []
                    for point in reader:
                        for key, value in point.items():
                            result[filename][key].append(float(value))
        json.dump(result, jsfile)


if __name__ == '__main__':
    main()
