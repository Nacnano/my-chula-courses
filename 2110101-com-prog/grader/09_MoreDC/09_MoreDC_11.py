n = int(input())
for i in range(n):
    s, cnt = input(), 0
    for c in s:
        if c != '.':
            break
        cnt += 1
    print('.'*int(cnt/2), end='')
    print(s.lstrip('.'))
