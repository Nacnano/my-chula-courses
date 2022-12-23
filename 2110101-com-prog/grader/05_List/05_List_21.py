def upgrade(grade):
    if grade == 'A':
        return 'A'
    if grade == 'B+':
        return 'A'
    if grade == 'B':
        return 'B+'
    if grade == 'C+':
        return 'B'
    if grade == 'C':
        return 'C+'
    if grade == 'D+':
        return 'C'
    if grade == 'D':
        return 'D+'
    if grade == 'F':
        return 'D'


uids, grades = [], []
while True:
    s = input()
    if s == 'q':
        break
    uid, grade = s.split()
    uids.append(uid)
    grades.append(grade)
upgrade_list = input().split()

for i in range(len(uids)):
    if uids[i] in upgrade_list:
        print(uids[i], upgrade(grades[i]))
    else:
        print(uids[i], grades[i])
