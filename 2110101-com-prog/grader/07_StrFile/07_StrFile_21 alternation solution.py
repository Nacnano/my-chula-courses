import codecs
s = input()
while s != 'end':
    print(codecs.encode(s, 'rot_13'))
    s = input()
