n = int(input())
dict_list = [{}, {}, {}, {}]
student_list = []
cnt = 0
for i in range(n):
    data = input().strip().split()
    for i in range(1, 4):
        if data[i] in dict_list[i]:
            dict_list[i][data[i]].add(cnt)
        else:
            dict_list[i][data[i]] = {cnt}
    student_list += [data]
    cnt += 1

ans = set()
q = input().strip().split()
for ask in q:
    try:
        if ask.isdigit():
            now = dict_list[2][ask]
        elif len(ask) == 1 or ask == 'Dog':
            now = dict_list[1][ask]
        elif ask in dict_list[3]:
            now = dict_list[3][ask]
        else:
            now = set()
    except:
        now = set()
    if ans == set():
        ans = now
    ans = ans.intersection(now)

if len(ans):
    list = []
    for index in ans:
        list += [[student_list[index][0], index]]
    for data in sorted(list):
        print(' '.join(student_list[data[1]]))
else:
    print("Not Found")
