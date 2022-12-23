def f1(a, b, c):
    mn = 1001
    list = [a, b, c]
    for x in list:
        if x > 0:
            mn = min(mn, x)
    return mn


def f2(a, b, c):
    mx = -1001
    list = [a, b, c]
    for x in list:
        if x < 0:
            mx = max(mx, x)
    return mx


def f3(a, b, c):
    s = abs(a+b+c)
    return int(str(s)[0])


def f4(a, b, c):
    s = abs(a+b+c)
    return s % 10


def main():
    s1, s2, a, b, c = [int(x) for x in input().split()]
    if s1 == 0 and s2 == 0:
        print(f1(a, b, c))
    elif s1 == 0 and s2 == 1:
        print(f2(a, b, c))
    elif s1 == 1 and s2 == 0:
        print(f3(a, b, c))
    elif s1 == 1 and s2 == 1:
        print(f4(a, b, c))
    else:
        print("Error")


exec(input().strip())  # DON'T remove this line
