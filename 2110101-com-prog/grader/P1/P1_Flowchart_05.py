c = input().strip()

if c == 'S':
    m = int(input())
    q = 1
    r = 0
    t = 1
    k = 1
    n = 3
    x = 3
    i = 0
    p = ""
    while i < m:
        if 4*q + r - t < n*t:
            p += str(n)
            i += 1
            a = 10*(r-n*t)
            n = 10*(3*q+r)//t - 10*n
            q *= 10
            r = a
        else:
            a = (2*q+r)*x
            b = (7*q*k+2+x*r)//(x*t)
            q *= k
            t *= x
            x += 2
            k += 1
            n = b
            r = a
    p = p[0] + "." + p[1:]
    print("pi =", p)
else:
    if c == 'R':
        n = int(input())
        p = 0
        for i in range(n+1):
            p += 12**0.5*(-3)**(-i)/(2*i+1)
        p = round(p, 12)
        print("pi =", p)
    else:
        if c == 'P':
            p = (7+(6+5**0.5)**0.5)**0.5
            p = round(p, 6)
            print("pi =", p)
        else:
            print("Invalid")
