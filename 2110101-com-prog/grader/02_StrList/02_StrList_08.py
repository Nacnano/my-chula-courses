from math import gcd

a, b, c = input().replace(" ", "").split(",")
x = int(a+b+c)-int(a+b)
y = 10**(len(b)+len(c))-10**(len(b))
z = gcd(x, y)
print(x//z, "/", y//z)
