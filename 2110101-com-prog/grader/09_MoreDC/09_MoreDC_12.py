n = int(input())
union_set, intersect_set = set(), set()
for i in range(n):
    s = set()
    for number in input().split():
        s.add(number)
    union_set = union_set.union(s)
    if i == 0:
        intersect_set = s
    intersect_set = intersect_set.intersection(s)

print(len(union_set))
print(len(intersect_set))
