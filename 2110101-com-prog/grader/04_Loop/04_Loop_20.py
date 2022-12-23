
i, min1, max1, min2, max2 = 0,  10**9, -10**9, 10**9, -10**9
while True:
    i += 1
    q = input()
    if q in ['Zig-Zag', 'Zag-Zig']:
        break
    # BRUH NVM, Aj. stated in the problem that we can't use list but input().split() also return as a list.
    a, b = [int(x) for x in q.split()]
    if i % 2:
        min1 = min(min1, a)
        max1 = max(max1, b)
        min2 = min(min2, b)
        max2 = max(max2, a)
    else:
        min1 = min(min1, b)
        max1 = max(max1, a)
        min2 = min(min2, a)
        max2 = max(max2, b)
if q == 'Zig-Zag':
    print(min1, max1)
else:
    print(min2, max2)
