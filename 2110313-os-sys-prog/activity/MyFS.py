#!/usr/bin/env python2
# -*- coding: utf-8 -*-
# 2110352 Operating System
# FUSE/Filesystem exercise
# By Krerk Piromsopa, Ph.D. <Krerk.P@chula.ac.th>
# Department of Computer Engineering
# Chulalongkorn University.

import os, stat, errno
import fuse
from fuse import Fuse
import requests

if not hasattr(fuse, '__version__'):
    raise RuntimeError("your fuse-py doesn't know of fuse.__version__, probably it's too old.")

fuse.fuse_python_api = (0, 2)

containers={ \
		'/subject':"2018S1 - Operating Systems\nCP ENG CU\n", \
		'/instructors':"0:CP ENG CU OS 2023S2 - Instructors\n1: Thongchai Rojkangsadan\n2: Veera Muangsin, Ph.D.\n3: Krerk Piromsopa, Ph.D.\n",\
		'/students':"0:CP ENG CU OS 2023S2 – Students, Group Name: สาธุ 99\n1: 6432051921 Nattawat Klinsukon \n2: 6432179621 Sorawit Kamphoi \n3: 6430053821 Jutatuch Sattaviriyapun\n", \
		'/participation':"just api"
	}

class MyStat(fuse.Stat):
    def __init__(self):
        self.st_mode = 0
        self.st_ino = 0
        self.st_dev = 0
        self.st_nlink = 0
        self.st_uid = 0
        self.st_gid = 0
        self.st_size = 0
        self.st_atime = 0
        self.st_mtime = 0
        self.st_ctime = 0

class MyFS(Fuse):

    def getattr(self, path):
        st = MyStat()
        if path == '/':
            st.st_mode = stat.S_IFDIR | 0o777
            st.st_nlink = 2
        elif path in containers:
            st.st_mode = stat.S_IFREG | 0o444
            st.st_nlink = 1
	    if path == "/participation":
	        req = requests.get('https://mis.cp.eng.chula.ac.th/krerk/teaching/2022s2-os/status.php')
		    content = req.text.encode('utf-8')
	    else:
           	content=containers[path]
            st.st_size = len(content)
        else:
            return -errno.ENOENT
        return st

    def readdir(self, path, offset):
        filenames=containers.keys()
        for r in  '.', '..':
            yield fuse.Direntry(r)

        for r in filenames:
            yield fuse.Direntry(r[1:])


    def open(self, path, flags):
        if path not in containers:
            return -errno.ENOENT
        accmode = os.O_RDONLY | os.O_WRONLY | os.O_RDWR
        if (flags & accmode) != os.O_RDONLY and not (path == "/participation" and (flags & accmode) == os.O_WRONLY):
            return -errno.EACCES
            
    def read(self, path, length, offset, fh):
        os.lseek(fh, offset, os.SEEK_SET)
        return os.read(fh, length)

    def read(self, path, size, offset):
        if path not in containers:
            return -errno.ENOENT
        
        if path == "/participation":
	        req = requests.get('https://mis.cp.eng.chula.ac.th/krerk/teaching/2022s2-os/status.php')
            content = req.text.encode('utf-8')
        else:
	        content = containers[path]

        slen = len(content)
        if offset < slen:
            if offset + size > slen:
                size = slen - offset
            buf = content[offset:offset+size]
        else:
            buf = b''
        return buf
    
    def write(self, path, buf, offset):
        if (path != "/participation"):
            return -errno.ENOENT
        
        split_data = buf.split(':')
        data = {'studentid': split_data[0], 'name': split_data[1], 'email': split_data[2] }
        req = requests.post('https://mis.cp.eng.chula.ac.th/krerk/teaching/2022s2-os/checkIn.php', data=data)
        return len(buf)

def main():
    usage="""
MyFS mounting_point

""" + Fuse.fusage
    server = MyFS(version="%prog " + fuse.__version__,
                     usage=usage,
                     dash_s_do='setsingle')

    server.parse(errex=1)
    server.main()

if __name__ == '__main__':
    main()
