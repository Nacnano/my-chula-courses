s = input()
alphabet = 'abcdefghijklmnopqrstuvwxyz'
while s != 'end':
    for c in s:
        isupper = c.isupper()
        find = alphabet.find(c.lower())
        if find == -1:
            c = c
        elif find >= 13:
            c = alphabet[find-13]
        else:
            c = alphabet[find+13]
        if isupper:
            print(c.upper(), end='')
        else:
            print(c.lower(), end='')
    print()
    s = input()
