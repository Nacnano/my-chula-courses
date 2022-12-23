s = input()
s1 = s2 = ''
for i in range(3, 32, 7):
    s1 += s[i]
for i in range(7, 32, 5):
    s2 += s[i]
s3 = int(s1)+int(s2)+10000
s4 = str(s3)
print(s4[-4:-1]+chr(ord('@')+((int(s4[-4])+int(s4[-3])+int(s4[-2])) % 10)+1))
