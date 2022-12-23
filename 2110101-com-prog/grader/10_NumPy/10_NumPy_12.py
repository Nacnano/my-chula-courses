import numpy as np


def toCelsius(f):
    return (f-32)*5/9


def BMI(wh):
    return wh[::, 0] / wh[::, 1]**2*10000


def distanceTo(p, Points):
    return ((Points[::, 0]-p[0])**2 + (Points[::, 1]-p[1])**2)**0.5


exec(input().strip())
