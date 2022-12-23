list = [float(x) for x in input().split()]

mx = -10*9
mn = 10*9
for num in list:
    if num > mx:
        mx = num
    if num < mn:
        mn = num

print(round((sum(list)-mx-mn)/2, 2))
