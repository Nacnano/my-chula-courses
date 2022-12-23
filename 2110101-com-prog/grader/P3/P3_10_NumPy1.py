import numpy as np


def eq(A, B, p):
    return np.sum(A == B) / np.prod(A.shape) >= p / 100


def closest_point_indexes(points, p):
    dis = (points[:, 0] - p[0])**2 + (points[:, 1]-p[1])**2
    return np.arange(dis.shape[0])[dis == np.min(dis)]


def number_of_inversions(A):
    index = np.arange(A.shape[0]) < np.arange(A.shape[0]).reshape((A.shape[0], 1))
    value = (A > A.reshape((A.shape[0], 1)))
    return np.sum(value & index)


exec(input().strip())
