import json
from os import stat_result
from django.http import JsonResponse
from django.http.response import HttpResponse
from .models import CrimeData
import random
from django.views.decorators.csrf import csrf_exempt

def get_crime_grade(request):
    if request.method == "GET":
        state = request.GET['state']
        county = request.GET['county']
        zip_code = request.GET['zip']
        return JsonResponse({
            "state": state,
            "county": county,
            "zip": zip_code,
            "crime_grade": random.randint(0,4) # A = 0, F = 4
        })

@csrf_exempt
def create_file_crime(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        json_data = json_data['data']
        for entry in json_data:
            CrimeData(
                state=entry['state'],
                county=entry['county'],
                zip=entry['zip'],
                score=entry['tcr'],
            ).save()
        return HttpResponse(status=201)
    return HttpResponse(status=400)

@csrf_exempt
def create_crime(request):
    if request.method == "POST":
        state = request.POST['state']
        county = request.POST['county']
        zip = request.POST['zip']
        score = request.POST['score']
        crime = CrimeData(state=state, county=county, zip=zip, score=score)
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
