# Todo Microservices
Todo is a microservice-based application.
It is created by Natawut Nupairoj for 2110415 Software Defined Systems at Department of Computer Engineering, Chulalongkorn University.

## Docker
To build the container for this module, use the following command:
```
docker build -t todo:release-2 .
```

To perform the test using pytest
with the script in the source:
```
docker run -it --rm --name todo -p 8000:8000 todo:release-2 /bin/sh -c "cd /root/todo ; export PYTHONPATH=/root/todo ; pytest tests/test_services.py::test_connectivity"
```
Note that we can test only test_services.py::test_connectivity because other tests require the connection to redis.

To run the container, use the following command:
```
docker run -it --rm --name todo todo:release-2
```

## Running

```
python -m uvicorn --host=0.0.0.0 --port=8000 --reload todo.main:app
```
