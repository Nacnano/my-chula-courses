dict = {"January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12}

t1 = input().replace(",", "").split()
t2 = input().replace(",", "").split()

if int(t1[-1]) > int(t2[-1]):
    print(t2[0])
elif int(t1[-1]) == int(t2[-1]):
    if dict[t1[1]] > dict[t2[1]]:
        print(t2[0])
    elif dict[t1[1]] == dict[t2[1]]:
        if int(t1[2]) > int(t2[2]):
            print(t2[0])
        elif int(t1[2]) == int(t2[2]):
            print(t1[0], t2[0])
        else:
            print(t1[0])
    else:
        print(t1[0])
else:
    print(t1[0])
