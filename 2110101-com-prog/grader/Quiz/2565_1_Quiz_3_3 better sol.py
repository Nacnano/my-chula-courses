allyOf = {}
enemies = []
inputs = input().split()
while inputs != 'End':
    countries = inputs[1:]
    if inputs[0] == 'Ally':
        all = set(countries)
        for country in countries:
            if country in allyOf:
                all = all.union(allyOf[country])
            else:
                all.add(country)
        for country in countries:
            allyOf[country] = all
    elif inputs[0] == 'Enemy':
        for country in countries:
            if country not in allyOf:
                allyOf[country] = {country}

        enemies += [countries]
    else:
        okay = True
        for i in range(-1, len(countries)-1):
            for pair in enemies:
                if countries[i] in allyOf[pair[1]] and countries[i+1] in allyOf[pair[0]]:
                    okay = False
                elif countries[i] in allyOf[pair[0]] and countries[i+1] in allyOf[pair[1]]:
                    okay = False
        if okay:
            print('Okay')
        else:
            print('No')
    inputs = input().split()
