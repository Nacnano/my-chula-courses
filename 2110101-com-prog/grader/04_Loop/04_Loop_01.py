len = 0
sum = 0
while True:
    x = input()
    if x == 'q':
        break
    sum += float(x)
    len += 1
if len:
    print(round(sum/len, 2))
else:
    print("No Data")
