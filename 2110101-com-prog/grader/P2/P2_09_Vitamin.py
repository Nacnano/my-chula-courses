n = int(input())
v = list()
dict = {}
for i in range(n):
    c = input().split()
    v += [[c[0], [float(x) for x in c[1:]]]]
    dict[c[0]] = c
c = input().split()
if c[0] == 'show':
    for list in v:
        print(list[0], end=' ')
        for val in list[1]:
            print(val, end=' ')
        print()
elif c[0] == 'max':
    list = []
    for i in range(n):
        list += [[-v[i][1][int(c[1])-1], v[i][0]]]
    max_list = sorted(list)[0]
    print(max_list[1], -max_list[0])
elif c[0] == 'avg':
    list = []
    for i in range(n):
        list += [v[i][1][int(c[1])-1]]
    print(round(sum(list)/n, 4))
elif c[0] == 'get':
    if c[1] in dict:
        print(' '.join(dict[c[1]]))
    else:
        print(c[1], 'not found')
elif c[0] == 'sort':
    list = []
    for i in range(n):
        list += [[v[i][1][int(c[1])-1], v[i][0]]]
    for data in sorted(list):
        print(data[1], end=' ')
