d = [[0, 1], [0, -1], [1, 0], [-1, 0]]
n, m = [int(x) for x in input().split()]
back = [[(-1, -1)] * m for i in range(n)]
s = []
used = set()


def dfs(x, y, index):
    if index == len(find):
        ans = []
        now = (x, y)
        while True:
            if now == (-1, -1):
                break
            ans += [(now[1], now[0])]
            now = back[now[1]][now[0]]
        print(ans[::-1])
        exit(0)

    for i in range(4):
        nx, ny = x+d[i][0], y+d[i][1]
        if nx < 0 or ny < 0 or nx >= m or ny >= n or (nx, ny) in used:
            continue
        if find[index] == s[ny][nx]:
            used.add((nx, ny))
            back[ny][nx] = (x, y)
            dfs(nx, ny, index+1)
            used.remove((nx, ny))
            back[ny][nx] = (-1, -1)


for i in range(n):
    s += [list(input())]
find = input()


for i in range(n):
    for j in range(m):
        if find[0] == s[i][j]:
            back = [[(-1, -1)] * m for i in range(n)]
            dfs(j, i, 1)
