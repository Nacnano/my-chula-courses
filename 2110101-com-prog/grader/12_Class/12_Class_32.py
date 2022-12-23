class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return "("+str(self.x)+","+str(self.y)+")"


class Rect:
    def __init__(self, p1, p2):
        self.lowerleft = p1
        self.upperright = p2

    def __str__(self):
        return str(self.lowerleft)+"-"+str(self.upperright)

    def area(self):
        return (self.lowerleft.x-self.upperright.x)*(self.lowerleft.y-self.upperright.y)

    def __lt__(self, rhs):
        return self.area() < rhs.area()


n = int(input())
rects = []
for i in range(n):
    x1, y1, x2, y2 = [int(e) for e in input().split()]
    rects.append(Rect(Point(x1, y1), Point(x2, y2)))
rects.sort()
for i in range(n):
    print(rects[i])
