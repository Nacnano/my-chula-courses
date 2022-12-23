s = input() + '.'
list_ans = []
last = s[0]
count = 1
for i in range(1, len(s)):
    if s[i] == last:
        count += 1
    else:
        list_ans.append((last, count))
        last = s[i]
        count = 1
for char, count in list_ans:
    print(char + " " + str(count) + " ", end="")
