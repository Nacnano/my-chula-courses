# todo/models.py
# Natawut Nupairoj
# Department of Computer Engineering, Chulalongkorn University
# Created for 2110415 Software Defined Systems

from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel


class Todo(BaseModel):
    id: Optional[int] = 0
    title: str
    detail: str
    completed: bool
    duedate: datetime
    tags: List[str]
