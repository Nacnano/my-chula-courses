s = input().strip().upper()
valid = True
for c in s:
    if c not in ['A', 'T', 'C', 'G']:
        valid = False

q = input()

if not valid:
    print("Invalid DNA")
elif q == 'R':
    new_s = ''
    for c in s:
        if c == 'A':
            new_s += 'T'
        elif c == 'T':
            new_s += 'A'
        elif c == 'C':
            new_s += 'G'
        else:
            new_s += 'C'
    print(new_s[::-1])
elif q == 'F':
    print("A=", end='')
    print(s.count('A'), end='')
    print(", T=", end='')
    print(s.count('T'), end='')
    print(", G=", end='')
    print(s.count('G'), end='')
    print(", C=", end='')
    print(s.count('C'))
else:
    target = input().strip()
    ans = 0
    for i in range(len(s)-len(target)+1):
        add = 1
        for j in range(len(target)):
            if s[i+j] != target[j]:
                add = 0
        ans += add
    print(ans)
