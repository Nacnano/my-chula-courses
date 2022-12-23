list = [int(x) for x in input().split()]
k = int(input())
ans = 0
cnt = 0
prev = -1
for num in list:
    if num == prev:
        cnt += 1
    else:
        prev = num
        cnt = 1
    if cnt == k:
        ans -= num*(k-1)
    elif cnt < k:
        ans += num
print(ans)
