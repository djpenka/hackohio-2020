import json
from os import stat_result
from random import gammavariate
from django.db.models.aggregates import Count
from django.http import JsonResponse
from django.http.response import HttpResponse
from .models import CrimeData
from .models import DisasterData
import random
import requests
import math
from django.views.decorators.csrf import csrf_exempt

def get_aggregation_grade(request):
    if request.method == "GET":
        crime = request.GET['crime']
        crime = float(crime) * .6
        disaster = request.GET['disaster']
        disaster = float(disaster) * .3
        air_quality = request.GET['air_quality']
        air_quality = float(air_quality) * .1
        return JsonResponse({
            'agg_grade': crime+disaster+air_quality
        })

def get_crime_grade(request):
    if request.method == "GET":
        state = request.GET['state']
        county = request.GET['county']
        zip_code = request.GET['zip']
        score = CrimeData.objects.filter(zip_code=zip_code).values()[0]['score']
        score = 100 - (score/4.5)
        crime_grade = conv_grade_to_number(score)
        return JsonResponse({
            "state": state,
            "county": county,
            "zip": zip_code,
            "crime_grade": crime_grade
        })

def get_air_quality(request):
    if request.method == "GET":
        lon = request.GET['lon']
        lat = request.GET['lat']
        aq_request = requests.get("https://api.breezometer.com/air-quality/v2/current-conditions?lat="+ lat + "&lon=" + lon + "&key=5fde71ac4135456e85fc91cd9897a450")
        aqi = aq_request.json()
        if aqi == None:
            aqi = 75
        else:
            aqi = aqi['data']['indexes']['baqi']['aqi']
        print(f"AQI: {aqi}", flush=True)
        aq_grade = conv_grade_to_number(aqi)
        print(f"AQ Grade: {aq_grade}", flush=True)
        return JsonResponse({
            "lat": lat,
            "lon": lon,
            "air_quality_grade": aq_grade,
        })
        
def conv_grade_to_number(p_grade):
    p_grade = p_grade/10
    p_grade = math.floor(p_grade)
    if p_grade <= 5:
        n_grade = 0
    else:
        n_grade = p_grade - 5
    return n_grade

#def get_weather_grade(request):
#    if request.method == "GET"
#        state = request.GET['state']
#       county = request.GET['county']
#        zip_code = request.GET['zip_code']

@csrf_exempt
def create_file_crime(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        json_data = json_data['data']
        for entry in json_data:
            CrimeData(
                state=entry['state'],
                county=entry['county'],
                zip_code=entry['zip'],
                score=entry['tcr'],
            ).save()
        return HttpResponse(status=201)
    return HttpResponse(status=400)

@csrf_exempt
def create_crime(request):
    if request.method == "POST":
        state = request.POST['state']
        county = request.POST['county']
        zip_code = request.POST['zip']
        score = request.POST['score']
        crime = CrimeData(state=state, county=county, zip_code=zip_code, score=score)
        crime.save()
        return HttpResponse(status=201)
    return HttpResponse(status=400)

def list_crime(request):
    if request.method == "GET":
        return JsonResponse({"objects": list(CrimeData.objects.all().values())})

@csrf_exempt
def clear_crime(request):
    if request.method == "DELETE":
        CrimeData.objects.all().delete()
        return HttpResponse(status=200)
    return HttpResponse(status=400)


@csrf_exempt
def create_disaster(request):
    if request.method == "POST":
        state_code = request.POST['stateCode']
        incident_type = request.POST['incidentType']
        disaster_name = request.POST['disasterName']
        disaster = DisasterData(state_code=state_code, incident_type=incident_type, disaster_name=disaster_name)
        disaster.save()
        return HttpResponse(status=201)
    return HttpResponse(status=400)


@csrf_exempt
def create_file_disaster(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        json_data = json_data['FemaWebDisasterDeclarations']
        for entry in json_data:
            DisasterData(
                state_code = entry['stateCode'],
                incident_type = entry['incidentType'],
                disaster_name = entry['disasterName'],
            ).save()
        return HttpResponse(status=201)
    return HttpResponse(status=400)

def get_disaster_grade(request):
    if request.method == "GET":
        state_code = request.GET['state_code']
        num_disasters = len(DisasterData.objects.filter(state_code=state_code).values())
        print(f"Number of disasters: {num_disasters}", flush=True)
        disaster_grade= 0
        if num_disasters<60:
            disaster_grade = 4
        elif num_disasters<120:
            disaster_grade = 3
        elif num_disasters<180:
            disaster_grade = 2
        elif num_disasters<240:
            disaster_grade = 1
        else:
            disaster_grade = 0
        return JsonResponse({
            "state_code": state_code,
            "disaster_grade": disaster_grade,
        })

@csrf_exempt
def clear_disaster(request):
    if request.method == "DELETE":
        DisasterData.objects.all().delete()
        return HttpResponse(status=200)
    return HttpResponse(status=400)

