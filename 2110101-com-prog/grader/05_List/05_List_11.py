count, ans = [0 for i in range(10)], []
s = input()
for char in s:
    try:
        count[int(char)] += 1
    except:
        continue
for i in range(10):
    if count[i] == 0:
        ans.append(i)
if len(ans) == 0:
    print("None")
else:
    for i in range(len(ans) - 1):
        print(str(ans[i]) + ",", end="")
    print(ans[-1])
