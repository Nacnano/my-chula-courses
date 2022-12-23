n, m, k = [int(x) for x in input().split()]
facultyOf = {}
childrenOf = {}
for i in range(n):
    name, faculty = input().split()
    facultyOf[name] = faculty
for i in range(m):
    inputs = input().split()
    parent, children = inputs[0], inputs[1:]
    childrenOf[parent] = children
for i in range(k):
    first = True
    for par in input().split():
        set_par = set()
        for child in childrenOf[par]:
            set_par.add(facultyOf[child])
        if not first:
            intersect = intersect.intersection(set_par)
        else:
            intersect = set_par
            first = False
    intersect = list(intersect.intersection(set_par))
    if len(intersect):
        for faculty in sorted(intersect):
            print(faculty, end=" ")
    else:
        print("None")
