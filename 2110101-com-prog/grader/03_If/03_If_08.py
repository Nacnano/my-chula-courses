d = int(input())
m = int(input())
y = int(input())

y -= 543
leap = y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

day_of_month = {
    0: 0,
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
}

# aka CUM
cumulative_day_of_month = {0: 0}
for i in range(1, 12):
    cumulative_day_of_month[i] = cumulative_day_of_month[i-1]+day_of_month[i]

print(cumulative_day_of_month[m-1]+d+1*(m > 2)*leap)
