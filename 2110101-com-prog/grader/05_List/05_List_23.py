n = int(input())
ls = []
for i in range(n):
    x, y = [float(i) for i in input().split()]
    ls.append([x**2+y**2, i, x, y])
ls.sort()
print('#' + str(ls[2][1]+1) + ': (' + str(ls[2][2]) + ', ' + str(ls[2][3]) + ')')
