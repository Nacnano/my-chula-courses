name = input().strip()
file = open(name, 'r')

target = input().strip()
change = input().strip()

for line in file.readlines():
    line = list(line)
    i = 0
    while i < len(line):
        if target[0].lower() == line[i].lower():
            find = 1
            for j in range(len(target)):
                if i+j >= len(line):
                    find = 0
                    break
                if target[j] == '?':
                    continue
                if target[j].lower() != line[i+j].lower():
                    find = 0
                    break
            for k in range(i+j, len(line)):
                if line[k] == '/':
                    break
                if k == len(line)-1:
                    find = 0

            if find == 1:
                line = line[:i] + list(change) + line[i+j+1:]
        i += 1
    for c in line:
        print(c, end='')
