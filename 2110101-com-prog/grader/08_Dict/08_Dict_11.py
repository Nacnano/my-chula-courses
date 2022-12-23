def reverse(d):
    dict = {}
    for key in d:
        dict[d[key]] = key
    return dict


def keys(d, v):
    list = []
    for key in d:
        if d[key] == v:
            list.append(key)
    return list


exec(input().strip())
