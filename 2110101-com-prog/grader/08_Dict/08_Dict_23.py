n = int(input())
dict1, dict2 = {}, {}
for i in range(n):
    s = input().split()
    name = ''
    for i in range(len(s)-1):
        name += s[i] + ' '
    name = name.strip()
    phone = s[-1]
    dict1[phone] = name
    dict2[name] = phone

m = int(input())
for i in range(m):
    s = input()
    if s in dict1:
        print(s, '-->', dict1[s])
    elif s in dict2:
        print(s, '-->', dict2[s])
    else:
        print(s, '--> Not found')
