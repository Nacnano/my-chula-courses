name = input()
f = open(name, 'r')
lines = [line.strip('\n') for line in f.readlines()]
blank = [True] * len(lines[0])

for line in lines:
    for i in range(len(line)):
        if line[i] != '.':
            blank[i] = False

q = input()
if q in ['RSTRIP', 'LSTRIP', 'STRIP']:
    start = 0
    end = len(line)
    if q == 'LSTRIP':
        start = blank.index(False)
    elif q == 'RSTRIP':
        end = len(blank) - blank[::-1].index(False)
    elif q == 'STRIP':
        start = blank.index(False)
        end = len(blank) - blank[::-1].index(False)
    for line in lines:
        for i in range(max(start, 0), min(end, len(line))):
            print(line[i], end='')
        print()
elif q == 'STRIP_ALL':
    for line in lines:
        for i in range(len(line)):
            if not blank[i]:
                print(line[i], end='')
        print()
else:
    print("Invalid command")
