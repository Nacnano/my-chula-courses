ls = []
q = 0


def update(x):
    global q
    if q:
        ls.insert(0, x)
    else:
        ls.append(x)
    q = 1 - q


for i in range(int(input())):
    update(int(input()))

for x in input().split():
    update(int(x))

ls3 = []
while True:
    x = int(input())
    if x == -1:
        break
    update(x)

print(ls)
