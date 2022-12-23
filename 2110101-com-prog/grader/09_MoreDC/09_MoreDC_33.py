def add_poly(p1, p2):
    ret = []
    it1, it2 = 0, 0
    while it1 < len(p1) and it2 < len(p2):
        value1, order1 = p1[it1]
        value2, order2 = p2[it2]
        if order1 == order2:
            if value1 + value2:
                ret += [(value1 + value2, order1)]
            it1 += 1
            it2 += 1
        elif order1 > order2:
            ret += [(value1, order1)]
            it1 += 1
        else:
            ret += [(value2, order2)]
            it2 += 1
    while it1 < len(p1):
        ret += [(p1[it1][0], p1[it1][1])]
        it1 += 1
    while it2 < len(p2):
        ret += [(p2[it2][0], p2[it2][1])]
        it2 += 1
    return ret


def mult_poly(p1, p2):
    dict = {}
    for value1, order1 in p1:
        for value2, order2 in p2:
            new_value = value1 * value2
            new_order = order1 + order2
            if new_order in dict:
                dict[new_order] += new_value
            else:
                dict[new_order] = new_value
    list1, ret = [], []
    for order in dict:
        list1 += [(order, dict[order])]
    for order, value in sorted(list1, reverse=True):
        ret += [(value, order)]
    return ret


for i in range(3):
    exec(input().strip())
