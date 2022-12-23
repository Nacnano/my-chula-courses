list, tmp = input().split(), [[], []]
l = int(len(list)/2)
s = input()
for char in s:
    if char == 'C':
        list = list[l:] + list[:l]
    elif char == 'S':
        tmp[0], tmp[1] = list[:l], list[l:]
        for i in range(2*l):
            list[i] = tmp[i % 2][int(i/2)]
for x in list:
    print(x, end=" ")
