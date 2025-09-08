# notification/db.py
# Natawut Nupairoj
# Department of Computer Engineering, Chulalongkorn University
# Created for 2110415 Software Defined Systems

import logging
import os

import redis

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
logger.addHandler(handler)


class Database:
    # handle singleton pattern
    __instance = None
    __list_key = 'notification:list'

    @staticmethod
    def getInstance():
        if Database.__instance == None:
            Database()
        return Database.__instance

    def __init__(self):
        if Database.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            Database.__instance = self
            if 'REDIS_HOST' in os.environ:
                redis_host = os.environ['REDIS_HOST']
            else:
                redis_host = 'localhost'
            if 'REDIS_PORT' in os.environ:
                redis_port = os.environ['REDIS_PORT']
            else:
                redis_port = 6379
            logger.info('Connecting to Redis({}, {})'.format(redis_host, redis_port))
            self.__redis = redis.StrictRedis(host=redis_host, port=redis_port, db=0,
                                             encoding="utf-8", decode_responses=True)

    def add(self, todo_id, timestamp):
        self.__redis.zadd(Database.__list_key, {str(todo_id): timestamp})

    def get(self, min, max):
        l = self.__redis.zrangebyscore(Database.__list_key, min=min, max=max, withscores=True)
        r = []
        for o in l:
            noti = o[0].split(':')
            data = {
                'id': int(noti[0]),
                'title': noti[1],
                'timestamp': o[1]
            }
            r.append(data)
        return r
