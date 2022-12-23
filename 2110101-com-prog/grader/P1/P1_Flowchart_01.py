a = [int(x) for x in input().split()]

if a[0]-a[4] > a[1]:
    if a[1] > a[2]+a[0]:
        if a[2]+a[4] > a[3]:
            print("C5")
        else:
            if a[2] < a[4]:
                print("C6")
            else:
                print("C7")
            print("C8")
else:
    if a[1]-a[0] > a[2]:
        skip = 1
    else:
        if a[3] < a[4]+a[0]:
            if a[2]+a[1] > a[4]:
                print("C3")
            else:
                print("C2")
            print("C4")
        else:
            print("C1")
