n = int(input())
dict_star = {}
for i in range(n):
    s = input().split(", ")
    movie = s[0]
    stars = s[1:]
    for star in stars:
        if star in dict_star:
            dict_star[star] += [movie]
        else:
            dict_star[star] = [movie]
stars = input().split(", ")
for star in stars:
    print(star, end=" -> ")
    if star in dict_star:
        print(", ".join(dict_star[star]))
    else:
        print("Not found")
