file_name, year = input().split()
f = open(file_name, 'r')

list = []
for line in f:
    id, score = line.split()
    if id[:2] == year[-2:]:
        list.append(float(score))

if len(list) > 0:
    print(min(list), max(list), sum(list)/len(list))
else:
    print("No data")
