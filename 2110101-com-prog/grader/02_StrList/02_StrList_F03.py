def add_vector(v1, v2):
    v3 = []
    for i in range(3):
        v3.append(v1[i]+v2[i])

    return "[" + str(float(v3[0])) + ", " + str(float(v3[1])) + ", " + str(float(v3[2])) + "]"


exec(input())
