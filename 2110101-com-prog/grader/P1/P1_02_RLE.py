def RLE(s):
    s += '.'
    list_ans = []
    last = s[0]
    count = 1
    for i in range(1, len(s)):
        if s[i] == last:
            count += 1
        else:
            list_ans.append([last, count])
            last = s[i]
            count = 1
    return list_ans


q = input()

if q == 'str2RLE':
    ls = RLE(input())
    for x in ls:
        print(x[0], str(x[1]), end=" ")

elif q == 'RLE2str':
    ls = input().split()
    for i in range(0, len(ls), 2):
        print(ls[i]*int(ls[i+1]), end="")
else:
    print("Error")
