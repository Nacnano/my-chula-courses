def grade_mcq(a, b):
    if len(a) != len(b):
        return -1
    else:
        ans = 0
        for i in range(len(a)):
            ans += a[i] == b[i]
        return ans


exec(input())
