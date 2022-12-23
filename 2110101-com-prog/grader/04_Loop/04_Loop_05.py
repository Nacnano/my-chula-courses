# Forget complex string matching algorithms
# All I know now is BRUTE FORCE!!! .isalpha() check whether that string is purely consisted of alphabets
a, b = input(), input()
ans = 0
for i in range(len(b)-len(a)+1):
    if a == b[i:i+len(a)]:
        if i > 0:
            if b[i-1].isalpha():
                continue
        if i+len(a) < len(b):
            if b[i+len(a)].isalpha():
                continue
        ans += 1
print(ans)
