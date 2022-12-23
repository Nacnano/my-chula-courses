n = int(input())
a = [[0, 0] for i in range(n)]
for i in range(n):
    a[i][0], a[i][1] = [int(x) for x in input().split()]
st = input() != 'Zig-Zag'
mn, mx = a[0][st], a[0][(st+1) % 2]
for i in range(1, n):
    mn, mx = min(mn, a[i][(st+i) % 2]), max(mx, a[i][(st+i+1) % 2])
print(mn, mx)
