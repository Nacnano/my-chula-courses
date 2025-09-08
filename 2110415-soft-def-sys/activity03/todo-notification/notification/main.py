# todo/main.py
# Natawut Nupairoj
# Department of Computer Engineering, Chulalongkorn University
# Created for 2110415 Software Defined Systems
import logging

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic.main import BaseModel

from notification.services import notification_services


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
logger.addHandler(handler)


class ServiceInfo(BaseModel):
    service_name: str
    version: str


my_info = ServiceInfo(service_name='Notification Service', version='1.0')
service_info = APIRouter()


@service_info.get('/service_info', response_model=ServiceInfo)
async def service_info_api():
    return my_info


logger.info('Init {} version {}'.format(my_info.service_name, my_info.version))
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)
app.include_router(service_info)
app.include_router(notification_services)