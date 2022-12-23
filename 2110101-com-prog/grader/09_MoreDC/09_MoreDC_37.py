n = int(input())
dict_max, dict_have = {}, {}
for i in range(n):
    name, value = input().strip().split()
    dict_max[name] = int(value)
    dict_have[name] = []

m, list = int(input()), []
for i in range(m):
    data = input().split()
    id, score, orders = data[0], float(data[1]), data[2:]
    list += [[score, id, orders]]

for score, id, orders in sorted(list, reverse=True):
    for order in orders:
        if len(dict_have[order]) < dict_max[order]:
            dict_have[order] += [id]
            break
ans = []
for key in dict_have:
    for id in dict_have[key]:
        ans += [[id, key]]

for id, name in sorted(ans):
    print(id, name)
