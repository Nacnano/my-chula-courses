n = int(input())
list = [n]
while n != 1:
    if not n % 2:
        n /= 2
    else:
        n = 3*n + 1
    list.append(int(n))
for i in range(max(len(list)-15, 0), len(list)-1):
    print(list[i], end="->")
print(1)
