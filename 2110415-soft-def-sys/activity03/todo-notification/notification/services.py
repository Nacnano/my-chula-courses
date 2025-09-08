# notification/services.py
# Natawut Nupairoj
# Department of Computer Engineering, Chulalongkorn University
# Created for 2110415 Software Defined Systems
import math
from typing import List
from fastapi import APIRouter, HTTPException
from notification.models import Notification
from notification.db import Database


db = Database.getInstance()
notification_services = APIRouter()


@notification_services.get('/', response_model=List[Notification])
async def get(begin: int = 0, end: int = math.inf):
    print('get', begin, end)
    r = db.get(begin, end)
    print(type(r))
    print(r)
    return db.get(begin, end)


@notification_services.post('/', status_code=201)
async def add(payload: Notification):
    notification = payload.dict()
    data = f'{notification["id"]}:{notification["title"]}'
    db.add(data, notification['timestamp'])
    return {'result': 'ok'}


