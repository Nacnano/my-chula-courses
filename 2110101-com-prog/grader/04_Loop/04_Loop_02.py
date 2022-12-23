a = float(input())
l = 0
u = 600
cnt = 90
while cnt:
    cnt -= 1
    x = (l+u)/2
    if 10**x > a:
        u = x
    else:
        l = x
print(round(l, 6))
