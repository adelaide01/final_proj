"""
Parses a Pillbox XML file for insertion into database.

Usage:

$ python parse_xml.py pillbox.xml 

"""

import sys
import xml.etree.ElementTree as ET
import model

def load_xml(session):
	# Create path to xml file.
	xml_path = sys.argv[1]

	# Parse xml file.
 	tree = ET.parse(xml_path)
	root = tree.getroot()

	for child in root:
		if child.tag != "pill":
	    # Skip over <disclaimer> and other tags that are not <pill>.
			continue

		pill_name = child.find("RXSTRING")
		code = child.find("RXCUI")
		imprint = child.find("SPLIMPRINT")
		shape = child.find("SPLSHAPE")
		color = child.find("SPLCOLOR")
		ingred1 = child.find("INGREDIENTS")
		ingred2 = child.find("SPL_INACTIVE_ING")
		manufacturer = child.find("AUTHOR")
		image_exist = child.find("HAS_IMAGE")
		image_id = child.find("image_id") #image_id tag is case sensitive
		
		#if code.text == None:
		# code.text = "0000000"

		#pill_data = (pill_name.text, code.text, imprint.text, manufacturer.text)
		pill_data = (pill_name.text, code.text, imprint.text, shape.text, color.text, ingred1.text, ingred2.text, manufacturer.text, image_exist.text, image_id.text)
		
		pill = model.Pill(pill_name = pill_data[0], code = pill_data[1], imprint = pill_data[2], shape = pill_data[3], color = pill_data[4], ingred1 = pill_data[5], ingred2 = pill_data[6], manufacturer = pill_data[7], image_exist = pill_data[8], image_id = pill_data[9])
		session.add(pill)	

def main(session):
    """ Call each of the load_* functions with the session as an argument. """
    load_xml(session)
    session.commit()

if __name__ == "__main__":
    s = model.connect()
    main(s)