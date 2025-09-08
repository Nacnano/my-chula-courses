# test/test_services.py
# Natawut Nupairoj
# Department of Computer Engineering, Chulalongkorn University
# Created for 2110415 Software Defined Systems
import pytest
from fastapi.testclient import TestClient
from todo.main import app
from datetime import datetime


def test_connectivity(client):
    response = client.get("/service_info")
    assert response.status_code == 200


def test_post_and_get(client):
    resp = client.get('/')
    existing = len(resp.json())

    tags = ['basic', 'high-priority', 'main']
    n = 3
    for i in range(n):
        title = 'todo#{}'.format(i)
        todo = {
            'title': title,
            'detail': 'this is the details for ' + title,
            'duedate': str(datetime.now()),
            'tags': tags[:i],
            'completed': i%2 == 0
        }
        resp = client.post('/', json=todo)
        assert resp.status_code == 201
        assert resp.json()['id'] == (existing + i)

    resp = client.get('/')
    assert resp.status_code == 200
    assert len(resp.json()) == (existing + n)


@pytest.fixture(autouse=True)
def client():
    return TestClient(app)
