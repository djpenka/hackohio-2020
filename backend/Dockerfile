FROM python:3.9

RUN mkdir /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt


WORKDIR /app
COPY manage.py .
COPY backend backend

CMD python -u manage.py runserver 0.0.0.0:8000
