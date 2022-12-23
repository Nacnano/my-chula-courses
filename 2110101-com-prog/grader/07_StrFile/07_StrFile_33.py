file1, file2 = input().strip().split()
list = []


def read_file(filename):
    global line
    f = open(filename, 'r')
    for line in f.readlines():
        id, grade = line.strip().split()
        faculty = id[-2:]
        list.append([faculty, id, grade])
    f.close()


read_file(file1)
read_file(file2)

list = sorted(list)

for faculty, id, grade in list:
    print(id, grade)
