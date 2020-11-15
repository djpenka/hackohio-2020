from django.db import models

class CrimeData(models.Model):
    state = models.TextField()
    county = models.TextField()
    zip = models.IntegerField()
    score = models.IntegerField()
