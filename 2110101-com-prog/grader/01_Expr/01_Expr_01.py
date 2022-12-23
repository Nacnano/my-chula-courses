import math


def calc(n, x):
    return (2*math.pi)**(1/2)*n**(n+1/2)*math.e**(-n+1/(12*n+x))


n = int(input())

print(calc(n, 1))
print(calc(n, 0))
