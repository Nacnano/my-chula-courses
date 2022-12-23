s = input()
dict = {}
type_list = []
while s != 'q':
    name, type = s.split(', ')
    if type in dict:
        dict[type] += [name]
    else:
        dict[type] = [name]
        type_list += [type]
    s = input()
for key in type_list:
    print(key + ': ' + ', '.join(dict[key]))
