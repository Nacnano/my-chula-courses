import math


def solve(n):
    list = ['', 'K', 'M', 'B']
    printed = False

    ans = ''
    for i in range(3, 0, -1):
        if 1000**i <= n:
            prev = n/1000**i
            if prev >= 10:
                ans += str(int(round(prev, 0)))
            else:
                ans += str(round(prev, 1))
            return ans+list[i]
    if not printed:
        return str(n)


print(solve(int(input())))


# The submitted code from CP47
# def solved(n):
#     i = n
#     if i < 1e3:
#         return str(i)
#     elif 1e3 <= i < 1e4:
#         return(str(round(i/1e3, 1))+'K')
#     elif 1e4 <= i < 1e5:
#         return(str(int(round(i/1e5, 2)*1e2))+'K')
#     elif 1e5 <= i < 1e6:
#         return(str(int(round(i/1e6, 3)*1e3))+'K')
#     elif 1e6 <= i < 1e7:
#         return(str(round(i/1e6, 1))+'M')
#     elif 1e7 <= i < 1e8:
#         return(str(int(round(i/1e8, 2)*1e2))+'M')
#     elif 1e8 <= i < 1e9:
#         return(str(int(round(i/1e9, 3)*1e3))+'M')
#     elif 1e9 <= i < 1e10:
#         return(str(round(i/1e9, 1))+'B')
#     elif 1e10 <= i < 1e11:
#         return(str(int(round(i/1e11, 2)*1e2))+'B')
#     elif 1e11 <= i:
#         return(str(int(round(i/1e12, 3)*1e3))+'B')

# CHECK PART :  WTF IS THIS TESTCASE LOL
# for i in range(100000000):
#     if solve(i) != solved(i):
#         print(i, solve(i), solved(i))
#         break

# for example, 15500
# My code got 16K
# but CP47's code got 15K LOLOLOLOLOLOLOLOL
