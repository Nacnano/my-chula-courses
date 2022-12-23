color_name = input()
file_name = input()
list_color = []
f = open(color_name, 'r')
for line in f.readlines():
    for color in line.strip().split():
        list_color += [color.lower()]
f.close()

f2 = open(file_name, 'r')
for line in f2.readlines():
    i = 0
    while i < len(line):
        have = 0
        for j in range(i, len(line)+1):

            now = line[i:j]
            if now.lower() in list_color:
                have = 1
                break
        if have:
            print('<' + now.lower() + '>' + now + '</>', end='')
            i = j-1
        else:
            print(line[i], end='')
        i += 1
f2.close()
