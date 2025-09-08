# test/test_services.py
# Natawut Nupairoj
# Department of Computer Engineering, Chulalongkorn University
# Created for 2110415 Software Defined Systems
import pytest
from fastapi.testclient import TestClient
from notification.main import app
from datetime import datetime


def test_connectivity(client):
    response = client.get("/service_info")
    assert response.status_code == 200


def test_post_and_get(client):
    now = int(datetime.now().timestamp())
    n = 5
    for i in range(n):
        notification = {
            'id': i,
            'title': 'todo#{}'.format(i),
            'timestamp': now + 2*i + 1
        }
        resp = client.post('/', json=notification)
        assert resp.status_code == 201

    url = '/?begin={}'.format(now)
    resp = client.get(url)
    assert resp.status_code == 200
    data = resp.json()
    print(data)
    while len(data) > 0:
        now += 5
        resp = client.get('/?begin={}'.format(now))
        assert resp.status_code == 200
        data = resp.json()


@pytest.fixture(autouse=True)
def client():
    return TestClient(app)
