n = int(input())
countryOf = {}

for i in range(n):
    team, country = input().split()
    countryOf[team] = country

while True:
    s = input()
    if s == 'q':
        break
    teams = s.split()
    has = set()
    same = False
    for team in teams:
        if team in countryOf:
            country = countryOf[team]
        else:
            same = True
            continue
        if country in has:
            same = True
            continue
        has.add(country)
    if same:
        print("Not OK")
    else:
        print("OK")
