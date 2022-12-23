def is_prime(n):
    if n <= 1:
        return False
    for k in range(2, int(n**0.5)+1):
        if n % k == 0:
            return False
    return True


def next_prime(N):
    while True:
        N += 1
        if is_prime(N):
            return N


def next_twin_prime(N):
    while True:
        N = next_prime(N)
        M = next_prime(N)
        if N + 2 == M:
            return (N, M)

    # คืนจ านวนเฉพาะสองค่าที่เป็น twin prime ที่มีค่าน้อยสุดที่มากกว่า N
exec(input().strip())
