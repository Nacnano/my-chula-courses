from xmlrpc.client import Boolean


def is_odd(n):
    return Boolean(n % 2)


def has_odds(x):
    for i in x:
        if i % 2:
            return True
    return False


def all_odds(x):
    for i in x:
        if not i % 2:
            return False
    return True


def no_odds(x):
    for i in x:
        if i % 2:
            return False
    return True


def get_odds(x):
    ret = []
    for i in x:
        if i % 2:
            ret += [i]
    return ret


def zip_odds(a, b):
    a, b = get_odds(a), get_odds(b)
    ita, itb = 0, 0
    ret = []
    while ita < len(a) and itb < len(b):
        ret += [a[ita],  b[itb]]
        ita += 1
        itb += 1
    while ita < len(a):
        ret += [a[ita]]
        ita += 1
    while itb < len(b):
        ret += [b[itb]]
        itb += 1
    return ret


exec(input().strip())
