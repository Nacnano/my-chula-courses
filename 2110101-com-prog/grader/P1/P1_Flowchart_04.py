x1, x2, x3 = input(), input(), input()
x = x1 + x2 + x3

if len(x) == 9:
    win = "-"
    i = 0
    while i < 3:
        if x[3*i] == x[3*i+1] and x[3*i] == x[3*i+2]:
            win = x[3*i]
            break
        if x[i] == x[i+3] and x[i] == x[i+6]:
            win = x[i]
            break
        i += 1
    if win == '-':
        if x[0] == x[4] and x[0] == x[8]:
            win = x[0]
        if x[3] == x[4] and x[3] == x[6]:
            win = x[6]

    if win == '-':
        print("???")
    else:
        print(win)
else:
    print("ERROR")
