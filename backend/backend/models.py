from django.db import models

class CrimeData(models.Model):
    state = models.TextField()
    county = models.TextField()
    zip_code = models.IntegerField()
    score = models.IntegerField()

class DisasterData(models.Model):
    state_code = models.TextField()
    incident_type = models.TextField()
    disaster_name = models.TextField()
