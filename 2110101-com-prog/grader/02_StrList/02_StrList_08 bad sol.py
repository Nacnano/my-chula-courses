from fractions import Fraction

a, b, c = input().replace(" ", "").split(",")
num = 0
if len(a) > 0:
    num += int(a)
if len(b) > 0:
    num += int(b)*(0.1)**len(b)
if len(c) > 0:
    new_c = "0."+c*int(60/len(c))
    num += (0.1)**len(b)*float(new_c)

ls = str(Fraction(num).limit_denominator()).split("/")

if len(ls) == 1:
    print(ls[0] + " / " + "1")
else:
    print(ls[0] + " / " + ls[1])
