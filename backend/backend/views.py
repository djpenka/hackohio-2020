from django.http import JsonResponse
import random

def get_crime_grade(request):
    if request.method == "GET":
        state = request.GET['state']
        county = request.GET['county']
        return JsonResponse({
            "state": state,
            "county": county,
            "crime_grade": random.randint(0,4) # A = 0, F = 4
        })