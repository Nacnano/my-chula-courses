def row_number(t, e):
    for i in range(len(t)):
        if e in t[i]:
            return i


def flatten(t):
    ret = []
    for row in t:
        ret += row
    ret.remove(0)
    return ret


def inversions(x):
    ret = 0
    for i in range(len(x)):
        for j in range(i+1, len(x)):
            if x[i] > x[j]:
                ret += 1
    return ret


def solvable(t):
    row = len(t)
    inv_cnt = inversions(flatten(t))
    zero = row_number(t, 0)

    if (row % 2 and inv_cnt % 2 == 0) or (row % 2 == 0 and ((inv_cnt % 2 and zero % 2 == 0) or (inv_cnt % 2 == 0 and zero % 2))):
        return True
    return False


exec(input().strip())
