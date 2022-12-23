def distance1(x1, y1, x2, y2):
    return ((x1-x2)**2 + (y1-y2)**2)**0.5


def distance2(p1, p2):
    return distance1(p1[0], p1[1], p2[0], p2[1])


def distance3(c1, c2):
    dis = distance2(c1[:2], c2[:2])
    return dis, dis <= c1[2]+c2[2]


def perimeter(points):
    ret = 0
    for i in range(len(points)):
        ret += distance2(points[i], points[(i+1) % len(points)])
    return ret


exec(input().strip())
