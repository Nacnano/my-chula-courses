s = input()
tmp = 0
for i in range(12):
    tmp += (13-i)*int(s[i])
n12 = (11 - tmp % 11) % 10
print(s[0] + " " + s[1:5] + " " + s[5:10] + " " + s[10:12] + " " + str(n12))
