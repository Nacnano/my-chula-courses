a = input()
b = input()
if len(a) - len(b):
    print("Incomplete answer")
else:
    ans = 0
    for i in range(len(a)):
        ans += a[i] == b[i]
    print(ans)
