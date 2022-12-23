q = input()
n, error = int(input()), 0

s = ['' for i in range(n)]
s[0] = input()
for i in range(1, n):
    s[i] = input()
    if len(s[i-1]) != len(s[i]):
        error = 1

m = len(s[0])
if error:
    print("Invalid size")
elif q == '90':
    for i in range(m):
        for j in range(n-1, -1, -1):
            print(s[j][i], end="")
        print("")
elif q == 'flip':
    for i in range(n):
        print(s[i][::-1])
elif q == '180':
    for i in range(n-1, -1, -1):
        print(s[i][::-1])
