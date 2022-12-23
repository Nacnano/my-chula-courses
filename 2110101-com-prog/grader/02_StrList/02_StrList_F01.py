def check_digit(n):
    tmp = 0
    for i in range(12):
        tmp += (13-i)*int(n[i])
    return (11 - tmp % 11) % 10


exec(input())
