import requests
import json
from json.decoder import JSONDecodeError




##VARIABLES
# alphabetical list of state abbreviations (no alaska)
states = ["TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
#list of urls for each county
county_urls = []
#base api call url
base_url = "https://www.adt.com/content/dam/adt5/com/selfServe/datascience/crime/json/county-updated/"




#loop through state abbreviations and create a specific url for each state 
for STATE_ABBV in states:

	#list of zipcode data
	zip_data = {}
	zip_data['data'] =[]
	#print(STATE_ABBV)
	end_p = STATE_ABBV + ".json"
	state_url = ""
	state_url = base_url + end_p
	#loop through each county in a given state to add to the list of county urls to be used for county level json
	#print(state_url)
	state_response = requests.get(state_url)
	for feature in state_response.json()['features']:
		if not(feature['properties'] is None):
			county_name = feature['properties']['COUNTYNAME'].replace(' ', '')
			county_response= requests.get(base_url+STATE_ABBV.lower()+"/"+ county_name + ".json")
		
			#loop through each zip code in a given county and add a set of key:value pairs for state, county, zip code, and crime rate relative to national 
			try:
				for feature2 in county_response.json()['features']:
					if not(feature2['properties'] is None):
						zip_data['data'].append({'state' : STATE_ABBV, 'county' : county_name, 'zip' : feature2['properties']['GEO_CODE'], 'tcr' : feature2['properties']['CRMCYTOTC'] })
			except JSONDecodeError:
				print('Error with '+county_name)

			print('data from ' + county_name + ' collected')
			
		
	print(STATE_ABBV + ' data collection complete')
	filename = STATE_ABBV+'_data.json'
	outfile = open(filename,'w')
	json.dump(zip_data,outfile)
	outfile.close()
	print('Output file -'+ filename +'- created')

	print('--------------------------------------')
		

#send to json file
#
#outfile = open('zip_data.json','w')
#json.dump(zip_data,outfile)
#outfile.close()