s = input()
n = int(input())

if n > len(s):
    print("0"*(n-len(s)), end="")
print(s)
