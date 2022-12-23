def daysInMonth(month, y):
    if month in [1, 3, 5, 7, 8, 10, 12]:
        return 31
    if month in [4, 6, 9, 11]:
        return 30
    if month == 2:
        return (y % 4 == 0 and (y % 100 != 0 or y % 400 == 0))+28


d, m, y = [int(x) for x in input().strip(" ").split(" ")]
y -= 543

days = 0
while days < 15:
    d += 1
    if d > daysInMonth(m, y):
        d -= daysInMonth(m, y)
        m += 1
    if m > 12:
        m -= 12
        y += 1

    days += 1

print("{}/{}/{}".format(d, m, y+543))
