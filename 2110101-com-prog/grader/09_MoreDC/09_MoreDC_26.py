n = int(input())
visit = {}
user = {}
order = []
for i in range(n):
    id, cities = input().strip().split(':')
    cities = cities.split(',')
    for city in cities:
        if city in visit:
            visit[city] += [id]
        else:
            visit[city] = [id]
    user[id] = cities
    order += [id]

q = input()
ans = set()
for city in user[q]:
    for name in visit[city]:
        if name != q:
            ans.add(name)

if len(ans) == 0:
    print("Not Found")
else:
    for id in order:
        if id in ans:
            print(id)
