"""
CSV to JSON converter - Thank you @cjerdonek for making it possible!
Convert CSV to a specific nested JSON format used for D3.

"""
# -*- coding: utf-42 -*-
import csv 
import json 
#from sys import argv

def csv_to_json (csv):
    f = open("data.csv", 'r')
    data = csv.reader(f)
    #TO DO: close file

    d = {}
    for row in data:
        # list comprehension
        row = [item.replace("^", ",") for item in row]
        drug_type, company, drug_name, size, sales, treats, aka, units_sold, photo, image_file = row
        
        if drug_type is None:
            # Then probably got to end of file.
            continue
        drug = {
            "sales": sales,
            "aka": aka,
            "treats": treats,
            "name": drug_name,
            "size": int(size),
            "manufacturer": company,
            "units_sold": int(units_sold),
            "photo": photo,
            "image_file": image_file
        }

        if drug_type not in d:
            d[drug_type] = {}
        company_dict = d[drug_type]
        if company not in company_dict:
            company_dict[company] = []
        company_dict[company].append(drug)
    d3_list = []
    for drug_type, company_dict in d.items():
        companies = []
        for company_name, drugs in company_dict.items():
            companies.append({"name": company_name, "children": drugs})
        d3_list.append({"name": drug_type, "children": companies})


    json_filename = "test17" + ".json"
    print "writing file..."
    jsonf = open(json_filename, "w")
    data = json.dumps(d3_list, indent=2)
    jsonf.write(data)
    f.close() #closes CSV file
    jsonf.close() #closes newly written json file


<<<<<<< HEAD
print csv_to_json(csv)
=======
print csv_to_json(csv)
>>>>>>> 4570683b5adab1ca714cb5183b86f3e402714305
