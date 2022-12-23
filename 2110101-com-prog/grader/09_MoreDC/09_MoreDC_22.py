def read_matrix():
    m = []
    nrows = int(input())
    for k in range(nrows):
        x = input().split()
        r = []
        for e in x:
            r.append(float(e))
        m.append(r)
    return m


def mult_c(c, A):
    for i in range(len(A)):
        for j in range(len(A[0])):
            A[i][j] *= c
    return A


def mult(A, B):
    C = []
    for i in range(len(A)):
        for j in range(len(B[0])):
            sum = 0
            for k in range(len(B)):
                sum += A[i][k] * B[k][j]
            if j:
                C[i] += [sum]
            else:
                C += [[sum]]
    return C


exec(input().strip())
