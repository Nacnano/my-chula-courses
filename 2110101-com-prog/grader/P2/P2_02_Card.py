def value(x):
    if x == 'A':
        return 1
    elif x == 'T':
        return 10
    elif x == 'J':
        return 11
    elif x == 'Q':
        return 12
    elif x == 'K':
        return 13
    elif x == 'C':
        return 1
    elif x == 'D':
        return 2
    elif x == 'H':
        return 3
    elif x == 'S':
        return 4
    return int(x)


s = input().strip()
for i in range(0, len(s)-2, 2):
    c1, c2 = s[i:i+2], s[i+2:i+4]

    if c1[0] == c2[0]:
        diff = value(c1[1])-value(c2[1])
    else:
        diff = value(c1[0])-value(c2[0])
    if diff > 0:
        print("+", end='')
    print(diff, end='')
