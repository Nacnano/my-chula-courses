import numpy as np


def eq(A, B, p):
    return np.sum(A == B) / np.prod(A.shape) >= p / 100


def closest_point_indexes(points, p):
    dis = (points[:, 0] - p[0])**2 + (points[:, 1]-p[1])**2
    return np.arange(dis.shape[0])[dis == np.min(dis)]


def number_of_inversions(A):
    a = list(A)
    res = 0
    counts = [0]*(len(a)+1)
    rank = {v: i+1 for i, v in enumerate(sorted(a))}
    for x in reversed(a):
        i = rank[x] - 1
        while i:
            res += counts[i]
            i -= i & -i
        i = rank[x]
        while i <= len(a):
            counts[i] += 1
            i += i & -i
    return res


exec(input().strip())
