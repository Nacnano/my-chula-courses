def first_fit(L, e):
    for list in L:
        if sum(list) + e <= 100:
            list += [e]
            return
    L += [[e]]


def best_fit(L, e):
    check = []
    for i in range(len(L)):
        check += [[sum(L[i]), i]]
    for val, i in sorted(check, reverse=True):
        if val + e <= 100:
            L[i] += [e]
            return
    L += [[e]]


def partition_FF(D):
    ret = []
    for val in D:
        first_fit(ret, val)
    return ret


def partition_BF(D):
    ret = []
    for val in D:
        best_fit(ret, val)
    return ret


exec(input().strip())
