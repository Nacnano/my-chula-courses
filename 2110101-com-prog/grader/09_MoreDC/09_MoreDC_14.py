def read_file(filename, dict):
    f = open(filename, 'r')
    for line in f.readlines():
        id, value = line.strip().split(",")
        dict[id] = value
    f.close()


courses, teachers = {}, {}
read_file(input(), courses)
read_file(input(), teachers)
f = open(input(), 'r')
for line in f.readlines():
    id1, id2 = line.strip().split(",")
    if id1 in courses and id2 in teachers:
        print(courses[id1] + ',' + teachers[id2])
    else:
        print('record error')
f.close()
