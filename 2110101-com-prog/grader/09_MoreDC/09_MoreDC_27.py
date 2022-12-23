def knows(R, x, y):
    return y in R[x]


def is_celeb(R, x):
    for key in R:
        if not knows(R, key, x) and key != x:
            return False
    return (R[x] == {x} or R[x] == set())


def find_celeb(R):
    for key in R:
        if is_celeb(R, key):
            return key
    return None


def read_relations():
    R = dict()
    while True:
        d = input().split()
        if len(d) == 1:
            break
        if d[0] in R:
            R[d[0]].add(d[1])
        else:
            R[d[0]] = {d[1]}
        if d[1] not in R:
            R[d[1]] = set()
    return R


def main():
    R = read_relations()
    c = find_celeb(R)
    if c == None:
        print('Not Found')
    else:
        print(c)


exec(input().strip())
