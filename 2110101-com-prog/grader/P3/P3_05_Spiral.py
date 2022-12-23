import math


def spiral_square(n):
    table = [[0] * n for i in range(n)]
    key = [[0, 1], [-1, 0], [0, -1], [1, 0]]
    cnt = 1
    k = 0
    now = 1
    i = j = n//2
    while cnt <= n:
        for x in range(math.floor(cnt)):
            table[i][j] = now
            now += 1
            i += key[k][0]
            j += key[k][1]
        cnt += 0.5
        k += 1
        k %= 4
    return table


def print_square(S):
    for i in range(len(S)):
        print(' '.join([(2*' '+str(e))[-3:] for e in S[i]]))


exec(input().strip())
