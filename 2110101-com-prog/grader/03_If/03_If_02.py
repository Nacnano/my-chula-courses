score = {
    "A": 80,
    "B": 70,
    "C": 60,
    "D": 50,
    "F": 40,
}


class student:
    id = ''
    gpax = 4
    com = 'A'
    cal1 = 'A'
    cal2 = 'A'
    accept = False
    hash = 100000000000


a = student()
b = student()
a.id, a.gpax, a.com, a.cal1, a.cal2 = input().split()
b.id, b.gpax, b.com, b.cal1, b.cal2 = input().split()

for i in [a, b]:
    i.accept = (score[i.com] >= score['A']) & (score[i.cal1] >= score['C']) & (score[i.cal2] >= score['C'])
    i.hash = float(i.gpax)*100**4 + int(score[i.cal1])*100**3 + int(score[i.cal2])*100**2

if a.accept & b.accept == True:
    if a.hash == b.hash:
        print("Both")
    elif a.hash > b.hash:
        print(a.id)
    else:
        print(b.id)
elif a.accept == True:
    print(a.id)
elif b.accept == True:
    print(b.id)
else:
    print("None")
