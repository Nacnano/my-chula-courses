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


students = []
while True:
    s = input()
    if s == 'q':
        break
    uid, grade = s.split()
    students.append((uid, grade))
upgrade_list = input().split()

students.sort()
for i in range(len(students)):
    uid, grade = students[i]
    if uid in upgrade_list:
        print(uid, upgrade(grade))
    else:
        print(uid, grade)
