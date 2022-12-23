a = int(input())
b = int(input())
c = int(input())


if a < 100:
    while b < c:
        a += b**2 + c**2
        if a % 10 == 5:
            break
        else:
            if a % 2 == 0:
                b += 1
            else:
                c -= 1
            if a/b/c > 20:
                break
            else:
                continue
else:
    if a < b:
        if b < c:
            a += 3
            b = a + c
            c = b + a
        else:
            if a < c:
                a *= 2
                b = a + b
                c = b + c
            else:
                a = c + a
                b *= 2
                c = b-a
    else:
        if c > a:
            a = 3*b
            b = c + a
            c = a+b
        else:
            if b > c:
                a = b+c
                b = 7*a
                c = b-a
            else:
                a = c-5
                b = a - b
                c = 3*b


print(a, b, c)
