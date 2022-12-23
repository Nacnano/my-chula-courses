def missing_digits(s):
    count, ans = [0 for i in range(10)], []
    for char in s:
        try:
            count[int(char)] += 1
        except:
            continue
    for i in range(10):
        if count[i] == 0:
            ans.append(i)
    return ans


exec(input())
