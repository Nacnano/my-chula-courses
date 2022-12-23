def factor(N):
    ret = []
    for i in range(2, N+1):
        cnt = 0
        while N % i == 0:
            cnt += 1
            N /= i
        if cnt:
            ret += [[i, cnt]]
    return ret


exec(input().strip())
