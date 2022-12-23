s = input().strip().split()
dict = {}
while len(s) == 2:
    for i in range(2):
        if s[i] in dict:
            dict[s[i]] += [s[1-i]]
        else:
            dict[s[i]] = [s[1-i]]
    s = input().strip().split()

now, visit = [[s[0], 0]], set()
while len(now):
    name, cnt = now.pop()
    visit.add(name)
    if cnt < 2 and name in dict:
        for next in dict[name]:
            now += [[next, cnt + 1]]

for name in sorted(visit):
    print(name)
