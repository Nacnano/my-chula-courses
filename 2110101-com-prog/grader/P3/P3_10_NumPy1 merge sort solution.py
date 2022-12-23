import numpy as np


def eq(A, B, p):
    return np.sum(A == B) / np.prod(A.shape) >= p / 100


def closest_point_indexes(points, p):
    dis = (points[:, 0] - p[0])**2 + (points[:, 1]-p[1])**2
    return np.arange(dis.shape[0])[dis == np.min(dis)]


def merge_count_inversion(lst):
    lst = list(lst)
    if len(lst) <= 1:
        return lst, 0
    middle = int(len(lst) / 2)
    left, a = merge_count_inversion(lst[:middle])
    right, b = merge_count_inversion(lst[middle:])
    result, c = merge_count_split_inversion(left, right)
    return result, (a + b + c)


def merge_count_split_inversion(left, right):
    result = []
    count = 0
    i, j = 0, 0
    left_len = len(left)
    while i < left_len and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            count += left_len - i
            j += 1
    result += left[i:]
    result += right[j:]
    return result, count


def number_of_inversions(A):
    return merge_count_inversion(A)[1]


exec(input().strip())
