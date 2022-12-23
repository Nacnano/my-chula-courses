import math
total_par, total_stroke, total_fixed_stroke = 0, 0, 0
for i in range(9):
    par, stroke, choose = [int(x) for x in input().split()]
    total_par += par
    total_stroke += stroke
    fixed_stroke = min(par + 2, stroke)*choose
    total_fixed_stroke += fixed_stroke

handicap = int(math.floor(0.8*(1.5*total_fixed_stroke-total_par)))
print(total_stroke)
print(handicap)
print(total_stroke - handicap)
