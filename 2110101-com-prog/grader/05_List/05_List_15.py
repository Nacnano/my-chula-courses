# O(n^2) Solution lol
ls, have = [int(x) for x in input().split()], set()
for x in ls:
    if x not in have:
        have.add(x)
print(len(have))
print(list(have)[:10])
