n = int(input())
k = int(input())
nbad = n < 0 or type(n) == float
kbad = k < 1
if nbad and kbad:
    print("Invalid n and k ")
elif nbad:
    print("Invalid n")
elif kbad:
    print("Invalid k")
if kbad or nbad:
    exit(0)

print("".join((str(i+1) + "-"*(n-len(str(i+1))+1)) for i in range(k-1))+str(k)+"-"*(n-1-len(str(k))+1))

codes = [""]
for i in range(n):
    codes = codes+codes[::-1]
    for j in range(len(codes)):
        if j < len(codes)//2:
            codes[j] = "0" + codes[j]
        else:
            codes[j] = "1" + codes[j]
for i in range(len(codes)):
    print(codes[i], end="")
    if (i+1) % k == 0 or i == len(codes)-1:
        print()
    else:
        print(end=",")
