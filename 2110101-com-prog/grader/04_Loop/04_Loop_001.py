p = float(input())

k = 1
t = 1

while True:
    t *= (366 - k)/365
    if 1-t >= p:
        break
    k += 1


print(k)
