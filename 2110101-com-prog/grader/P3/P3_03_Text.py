fname = input().strip()
k = int(input())
for i in range(1, k+1):
    if i % 10:
        print('-', end='')
    else:
        print(i//10, end='')
print()

f = open(fname, 'r')
line = f.read().replace('\n', '.').strip() + '.'
count_list = []
mode = 'X'
count = 0
for i in range(len(line)):
    if mode == 'X':
        if line[i] != '.':
            count += 1
        else:
            count_list += [count]
            count = 1
            mode = '.'
    else:
        if line[i] == '.':
            count += 1
        else:
            count_list += [count]
            count = 1
            mode = 'X'
group_count_list = []
now, i = 0, 0
while i < len(count_list):
    if now == 0:
        if i % 2:
            i += 1
            continue
        elif count_list[i] > k:
            group_count_list += [count_list[i]]
            i += 1
            continue

    if now+count_list[i] > k:
        group_count_list += [now]
        now = 0
        continue
    now += count_list[i]
    i += 1
if now != 0:
    group_count_list += [now]
now = 0
for length in group_count_list:
    while line[now] == '.':
        now += 1
    print(line[now:now+length].strip('.'))
    now += length
