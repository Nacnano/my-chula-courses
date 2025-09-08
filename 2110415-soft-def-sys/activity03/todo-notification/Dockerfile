FROM python:3.7-buster

COPY . /root/notification
WORKDIR /root/notification

RUN pip install -r requirements.txt

EXPOSE 9000
CMD  python -m uvicorn --host=0.0.0.0 --port=9000 notification.main:app

