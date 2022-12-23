# ตอนแรกเข้าใจโจทย์ผิดว่า สามารถเรียงประเทศอย่างไรก็ได้ตาม list ที่ให้มา ทำให้ code อาจดูยุ่งๆ หน่อย

allyOf = {}
enemyOf = {}
while True:
    inputs = input().split()
    q = inputs[0]
    if len(inputs) == 1:
        break
    if q == 'Ally':
        countries = inputs[1:]
        allAlly = set()
        for country in countries:
            if country in allyOf:
                allAlly = allAlly.union(allyOf[country])
        allAlly = allAlly.union(set(countries))

        allEnemy = set()
        for country in countries:
            if country in enemyOf:
                allEnemy = allEnemy.union(enemyOf[country])

        for country in list(allAlly):
            allyOf[country] = allAlly
            enemyOf[country] = allEnemy

    elif q == 'Enemy':
        enemy1, enemy2 = inputs[1:]
        if enemy1 not in allyOf:
            allyOf[enemy1] = set()
            allyOf[enemy1].add(enemy1)
        if enemy2 not in allyOf:
            allyOf[enemy2] = set()
            allyOf[enemy2].add(enemy2)
        if enemy1 not in enemyOf:
            enemyOf[enemy1] = set()
            enemyOf[enemy1].add(enemy2)
        if enemy2 not in enemyOf:
            enemyOf[enemy2] = set()
            enemyOf[enemy2].add(enemy1)

        countries1 = allyOf[enemy1]
        countries2 = allyOf[enemy2]
        for country1 in countries1:
            enemyOf[country1] = enemyOf[country1].union(countries2)
        for country2 in countries2:
            enemyOf[country2] = enemyOf[country2].union(countries1)

    elif q == 'Table':
        countries = inputs[1:]
        yes = True
        for i in range(-1, len(countries)-1):
            c1, c2 = countries[i], countries[i+1]
            if c1 not in allyOf:
                allyOf[c1] = set()
                allyOf[c1].add(c1)
            if c2 not in allyOf:
                allyOf[c2] = set()
                allyOf[c2].add(c2)
            if c1 in enemyOf:
                for enemy in enemyOf[c1]:
                    if enemy in allyOf[c2]:
                        yes = False
            if c2 in enemyOf:
                for enemy in enemyOf[c2]:
                    if enemy in allyOf[c1]:
                        yes = False
        if yes:
            print("Okay")
        else:
            print("No")
    else:
        pass
