import math


def daysInMonth(month, y):
    if month in [1, 3, 5, 7, 8, 10, 12]:
        return 31
    if month in [4, 6, 9, 11]:
        return 30
    if month == 2:
        return (y % 4 == 0 and (y % 100 != 0 or y % 400 == 0))+28


def daysBetweenDates(day1, month1, year1, day2, month2, year2):
    days = 0
    while year1 < year2:
        if day1 != 1:
            days += daysInMonth(month1, year1)-day1+1
            day1 = 1
            month1 += 1
        while month1 < 13:
            days += daysInMonth(month1, year1)
            month1 += 1
        if month1 == 13:
            month1 = 1
            year1 += 1
    if year1 == year2:
        if day1 != 1:
            days += daysInMonth(month1, year1)-day1+1
            day1 = 1
            month1 += 1
        while month1 < month2:
            days += daysInMonth(month1, year1)
            month1 += 1
        if month1 == month2:
            days += day2-day1
    return days


bd, bm, by, d, m, y = [int(e) for e in input().split()]
by -= 543
y -= 543
if y > by:
    t = daysBetweenDates(bd, bm, by, 1, 1, by+1) + 365*(y-by-1) + daysBetweenDates(1, 1, y, d, m, y)
else:
    t = daysBetweenDates(bd, bm, by, d, m, y)

print("{} {:.2f} {:.2f} {:.2f}".format(t, math.sin(2*t*math.pi/23), math.sin(2*t*math.pi/28), math.sin(2*t*math.pi/33)))
