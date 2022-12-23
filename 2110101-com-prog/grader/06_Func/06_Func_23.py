def make_int_list(x):
    return [int(x) for x in x.split()]


def is_odd(e):
    return bool(e % 2)


def odd_list(alist):
    ret = []
    for x in alist:
        if is_odd(x):
            ret.append(x)
    return ret


def sum_square(alist):
    ret = 0
    for x in alist:
        ret += x**2
    return ret


exec(input().strip())
