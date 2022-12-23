def read_vector(s):
    return s.strip("[").strip("]").split(", ")


def print_vector(a, b, c):
    return "[" + str(float(a)) + ", " + str(float(b)) + ", " + str(float(c)) + "]"


a1, a2, a3 = read_vector(input())
b1, b2, b3 = read_vector(input())

print(print_vector(a1, a2, a3) + " + " + print_vector(b1, b2, b3) + " = " +
      print_vector(float(a1)+float(b1), float(a2)+float(b2), float(a3)+float(b3)))
