dicts = [{}, {}]

n = int(input())
for i in range(n):
    names = input().strip().split()
    for i in range(2):
        dicts[i][names[i]] = names[1-i]

m = int(input())
for i in range(m):
    name = input().strip()
    for i in range(2):
        if name in dicts[i]:
            print(dicts[i][name])
            break
        if i == 1:
            print("Not found")
