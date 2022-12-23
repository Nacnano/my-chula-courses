s = input()
for i in range(len(s)):
    if s[i] == '(':
        print('[', end="")
    elif s[i] == '[':
        print('(', end="")
    elif s[i] == ')':
        print(']', end="")
    elif s[i] == ']':
        print(')', end="")
    else:
        print(s[i], end="")
