# s = '+'+input()
# mode = 1
# sum = 0
# for i in range(0, len(s)):

#     if s[i] not in ['+', '-'] and not s[i-1].isdigit():
#         num = ''
#         for j in range(i, len(s)):
#             if s[j].isdigit():
#                 num += s[j]
#             else:
#                 break
#         if num != '':
#             sum += mode*int(num)
#     elif s[i] == '+':
#         mode = 1
#     elif s[i] == '-':
#         mode = -1
# print(sum)

s = input()
if s[0] != '-':
    s = '+' + s
ls = s.replace('+', ',+').replace('-', ',-').split(',')
ans = 0
for x in ls[1:]:
    if x[0] == '+':
        ans += int(x[1:])
    else:
        ans -= int(x[1:])
print(ans)
