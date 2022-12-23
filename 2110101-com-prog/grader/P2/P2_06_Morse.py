file = open(input(), 'r')
f = file.readlines()
file.close()

func = f[0].strip()
dict = {}
morse = [x.split('[') for x in f[1].strip().split(']')]
for i in range(len(morse)-1):
    dict[morse[i][1]] = morse[i+1][0]

if func == 'T2M':
    for line in f[2:]:
        valid = True
        ans = ''
        for c in line.strip():
            if c in dict:
                ans += dict[c] + ' '
            else:
                valid = False
        if valid:
            print(ans)
        else:
            print("Invalid :", line.strip())
elif func == 'M2T':
    dict2 = {}
    for key in dict:
        dict2[dict[key]] = key
    for line in f[2:]:
        valid = True
        ans = ''
        for c in line.strip().split():
            if c in dict2:
                ans += dict2[c]
            else:
                valid = False
        if valid:
            print(ans)
        else:
            print("Invalid :", line.strip())
else:
    print("Invalid code")
