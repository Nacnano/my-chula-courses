def peaks(list):
    ls, ans = [10**9] + list + [10**9], []
    for i in range(1, len(ls)-1):
        if ls[i] > ls[i-1] and ls[i] > ls[i+1]:
            ans.append(i-1)
    return ans


exec(input())
