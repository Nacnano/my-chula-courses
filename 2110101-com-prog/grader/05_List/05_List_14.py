ls, cnt = [10**9] + [float(x) for x in input().split()] + [10**9], 0

for i in range(1, len(ls)-1):
    if ls[i] > ls[i-1] and ls[i] > ls[i+1]:
        cnt += 1
print(cnt)
