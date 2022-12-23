old_s = [input(), input()]
s = [x.lower() for x in old_s]
dict = [{}, {}]
for i in range(2):
    for c in s[i]:
        if not c.isalpha():
            continue
        if c in dict[i]:
            dict[i][c] += 1
        else:
            dict[i][c] = 1
for i in range(2):
    print(old_s[i])
    nope = 1
    for key in sorted(dict[i]):
        diff = dict[i][key]
        if key in dict[1-i]:
            diff -= dict[1-i][key]
        if diff > 0:
            print(" - remove", diff, key, end="'s"*(diff > 1)+'\n')
            nope = 0
    if nope:
        print(" - None")
