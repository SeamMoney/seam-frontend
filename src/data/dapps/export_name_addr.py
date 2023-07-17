import json
import re

# Assuming the input file is 'input.ts'
with open('dapp_data.ts', 'r') as input_file:
    content = input_file.read()

# Extract the JSON content from the file
json_string =  content.split("=")[1]
items = json.loads(json_string)

# Write the output to 'output.txt'
with open('output.txt', 'w') as output_file:
    for item in items:
        name = item.get('name', '')
        print(name)
        # address = item.get('address', '')
        # output_file.write(f"{name} {address}\n")
