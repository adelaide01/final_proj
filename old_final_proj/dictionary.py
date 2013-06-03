"""
Construct URL to query Pillbox API and capture returned XML.

"""
import pyquery
import urllib

pill_shape = {
"bullet":"C48335",
"capsule":"C48336",
"clover":"C48337",
"diamond":"C48338",
"double circle":"C48339",
"freeform":"C48340",
"gear":"C48341",
"heptagon (7 sided)":"C48342",
"hexagon (6 sided)":"C48343",
"octagon (8 sided)":"C48344",
"oval":"C48345",
"pentagon (5 sided)":"C48346",
"rectangle":"C48347",
"round":"C48348",
"semi-circle":"C48349",
"square":"C48350",
"tear":"C48351",
"trapezoid":"C48352",
"triangle":"C48353"}

pill_color = {
"black":"C48323",
"blue":"C48333",
"brown":"C48332",
"gray":"C48324",
"green":"C48329",
"orange":"C48331",
"pink":"C48328",
"purple":"C48327",
"red":"C48326",
"turquoise":"C48334",
"white":"C48325",
"yellow":"C48330"}

def url_constructor ():
	"""Construct the URL for queries based on user input."""
	temp_list = []
	base_url = "http://pillbox.nlm.nih.gov/PHP/pillboxAPIService.php?"
	api_key = "&key=GN48R480GH"
	temp_list.append(base_url + api_key)
	
	#parameters that use dictionaries
	shape = raw_input("What shape? ")
	if shape in pill_shape.keys():
		if shape:
			temp_list.append("&shape=" + pill_shape.get(shape))

	color = raw_input("What color? ")	
	#print "Your color is %s." % color
	
	if color in pill_color.keys():
		if color:
			temp_list.append("&color=" + pill_color.get(color))

	manufacturer = raw_input("Manufacturer? ")
	if manufacturer:
			temp_list.append("&author=" + manufacturer)	
	
	active_ingredient = raw_input("Active ingredient? ")
	if active_ingredient:
			temp_list.append("&ingredient=" + active_ingredient) 
	
	nonactive_ingredient = raw_input("Non-active ingredient? ")
	if nonactive_ingredient:
			temp_list.append("&inactive=" + nonactive_ingredient)

	
	url = "".join(temp_list)
	
	#Send URL query/request to Pillbox API
	print url
	xml = pyquery.PyQuery(url)
	print xml

print url_constructor()



























