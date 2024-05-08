import csv
import json
import re
import sys


# Path: local_dev/csv_to_json.py
def main():
    """Convert a CSV file to a JSON file."""
    # Set up the files
    file = sys.argv[1]
    outfile = re.sub('csv$', 'json', file)
    with open(file, encoding='utf-8-sig') as csvfile, \
            open(outfile, 'w') as jsfile:
        reader = csv.DictReader(csvfile)
        result = []
        for line in reader:

            result.append(line)
        json.dump(result, jsfile)


if __name__ == '__main__':
    main()
