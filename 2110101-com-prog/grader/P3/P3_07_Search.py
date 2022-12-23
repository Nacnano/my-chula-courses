countWordIn = {}
sizeOf = {}
n = int(input())
for i in range(n):
    name = input()
    words = input().split()
    tmp = {}
    for word in words:
        if word in tmp:
            tmp[word] += 1
        else:
            tmp[word] = 1
    countWordIn[name] = tmp
    sizeOf[name] = len(words)

s = input()
while s != "-1":
    all = []
    for name in countWordIn:
        if s in countWordIn[name]:
            all += [(1.0*countWordIn[name][s] / sizeOf[name] / len(countWordIn[name]), name)]
    if len(all):
        print(sorted(all)[-1][1])
    else:
        print("NOT FOUND")
    s = input()
