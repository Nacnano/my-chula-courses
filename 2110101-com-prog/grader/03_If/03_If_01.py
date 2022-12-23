s = input()
if s == '01' or s == '02':
    print("OK")
    exit()

try:
    n = int(s)
    if (n >= 20 and n <= 40) or n in [51, 53, 55, 58]:
        print("OK")
    else:
        print("Error")

except:
    print("Error")
