FROM python:3.7-buster

COPY . /root/todo
WORKDIR /root/todo

RUN pip install -r requirements.txt

EXPOSE 8000
CMD  python -m uvicorn --host=0.0.0.0 --port=8000 todo.main:app

