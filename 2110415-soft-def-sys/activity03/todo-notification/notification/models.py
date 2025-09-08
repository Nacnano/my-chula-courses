# todo/models.py
# Natawut Nupairoj
# Department of Computer Engineering, Chulalongkorn University
# Created for 2110415 Software Defined Systems

from pydantic import BaseModel


class Notification(BaseModel):
    id: int
    title: str
    timestamp: int
