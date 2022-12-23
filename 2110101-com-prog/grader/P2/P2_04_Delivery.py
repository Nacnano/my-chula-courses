def daysInMonth(m, y):
    new_y = y - 543
    if m in [1, 3, 5, 7, 8, 10, 12]:
        return 31
    if m in [4, 6, 9, 11]:
        return 30
    if m == 2:
        return 28 + (new_y % 4 == 0 and (new_y % 100 != 0 or new_y % 400 == 0))


def timeUsed(t):
    if t == 'E':
        return 1
    if t == 'Q':
        return 3
    if t == 'N':
        return 7
    return 14


s = input()
list = []
while s != 'END':
    id, type, d, m, y = s.strip().split()
    d, m, y = int(d), int(m), int(y)
    if y < 2558:
        print('Error:', s, '-->', 'Invalid year')
    elif m < 1 or m > 12:
        print('Error:', s, '-->', 'Invalid month')
    elif d > daysInMonth(m, y) or d < 1:
        print('Error:', s, '-->', 'Invalid date')
    elif type not in ['E', 'Q', 'N', 'F']:
        print('Error:', s, '-->', 'Invalid delivery type')
    else:
        time = timeUsed(type)
        while time > 0:
            d += 1
            time -= 1
            if d > daysInMonth(m, y):
                d -= daysInMonth(m, y)
                m += 1
            if m > 12:
                y += 1
                m -= 12
        list += [[y, m, d, id]]
    s = input()

for y, m, d, id in sorted(list):

    print(str(id) + ': delivered on', str(d) + '/' + str(m) + '/' + str(y))
