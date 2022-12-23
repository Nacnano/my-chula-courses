s = input().strip().lower()
dict = {}

for c in s:
    if not c.isalpha():
        continue
    if c in dict:
        dict[c] += 1
    else:
        dict[c] = 1

list = []
for key in dict:
    list.append([-dict[key], key])

list = sorted(list)

for value, key in list:
    print(key, '->', -value)
