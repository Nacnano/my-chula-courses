def convex_polygon_area(p):
    p += [p[0]]
    ret = 0
    for i in range(len(p)-1):
        ret += p[i][0]*p[i+1][1] - p[i][1]*p[i+1][0]
    return abs(ret)/2


def is_heterogram(s):
    check = set()
    for c in s.lower():
        if not c.isalpha():
            continue
        if c in check:
            return False
        else:
            check.add(c)
    return True


def replace_ignorecase(s, a, b):
    idx = 0
    while idx < len(s):
        index_l = s.lower().find(a.lower(), idx)
        if index_l == -1:
            return s
        s = s[:index_l] + b + s[index_l + len(a):]
        idx = index_l + len(b)
    return s


def top3(votes):
    ret = []
    list = []
    for key in votes:
        list += [[-votes[key], key]]
    for num, name in sorted(list):
        ret += [name]
        if len(ret) == 3:
            break
    return ret


for k in range(2):
    exec(input().strip())
