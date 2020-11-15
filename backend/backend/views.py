from django.http import JsonResponse
import random
import requests
import math

def get_crime_grade(request):
    if request.method == "GET":
        state = request.GET['state']
        county = request.GET['county']
        return JsonResponse({
            "state": state,
            "county": county,
            "crime_grade": random.randint(0,4) # A = 0, F = 4
        })

def get_air_quality(request):
	if request.method == "GET":
		lon = request.GET['lon']
		lat = request.GET['lat']
		aq_request = requests.get("https://api.breezometer.com/air-quality/v2/current-conditions?lat="+ lat + "&lon=" + lon + "&key=f2e0d678257a4a9694ff2793afb4df61")
		aqi = aq_request.json()['data']['indexes']['baqi']['aqi']
		aqc = aq_request.json()['data']['indexes']['baqi']['category']

		aq_grade = conv_grade_to_number(aqi)
		return JsonResponse({
			"lat": lat,
			"lon": lon,
			"air_quality_grade": aqn_grade,
		})

def get_disaster_grade(request):
	if request.method == "GET":
		state = request.GET['state']
		#num_disasters = 
		return JsonResponse({
			"lat": lat,
			"lon": lon,
			"disaster_grade": aq_grade,
		})
		
def conv_grade_to_number(p_grade):
	p_grade = p_grade/10
	p_grade = math.floor(p_grade)
	if p_grade <= 5:
		n_grade = 0
	else:
		n_grade = p_grade - 5;
	return n_grade

#def get_weather_grade(request):
#	if request.method == "GET"
#		state = request.GET['state']
#       county = request.GET['county']
#		zip_code = request.GET['zip_code']



		