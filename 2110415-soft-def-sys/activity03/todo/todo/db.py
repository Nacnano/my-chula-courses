# todo/db.py
# Natawut Nupairoj
# Department of Computer Engineering, Chulalongkorn University
# Created for 2110415 Software Defined Systems

import json
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
    __id_key_format = 'todo:id:{}'
    __last_id_key = 'todo:last_id'

    @staticmethod
    def to_key(id):
        return Database.__id_key_format.format(id)

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
            self.__redis = redis.StrictRedis(host=redis_host, port=redis_port, db=0)

    def add(self, todo):
        if self.__redis.exists(Database.__last_id_key):
            id = int(self.__redis.get(Database.__last_id_key))
        else:
            id = 0
            self.__redis.set(Database.__last_id_key, 0)
        self.update(id, todo)
        self.__redis.incr(Database.__last_id_key)
        return id

    def update(self, id, todo):
        todo['id'] = id
        key = Database.to_key(id)
        payload = json.dumps(todo, default=str)
        self.__redis.set(key, payload)
        return id

    def get(self, id):
        key = Database.to_key(id)
        data = None
        if self.__redis.exists(key):
            payload = self.__redis.get(key)
            data = json.loads(payload)
        return data

    def get_all(self):
        return self.search('', [])

    def search(self, q, tags, completed=None):
        pattern = Database.to_key('*')
        cursor, keys = self.__redis.scan(match=pattern)
        if len(keys) == 0:
            return []

        tagset = set(tags)
        r = []
        if q == '' and len(tagset) == 0 and completed is None:
            payloads = self.__redis.mget(keys)
            for payload in payloads:
                data = json.loads(payload)
                r.append(data)
        else:
            for k in keys:
                payload = self.__redis.get(k)
                todo = json.loads(payload)
                in_c = (completed is None) or (todo['completed'] == completed)
                in_q = (q == '') or (q in todo['title']) or (q in todo['detail'])
                in_t = (len(tagset) == 0) or (len(set(todo['tags']) & tagset) > 0)
                if in_c and in_q and in_t:
                    r.append(todo)

        r.sort(key=lambda x: x['id'])
        return r


