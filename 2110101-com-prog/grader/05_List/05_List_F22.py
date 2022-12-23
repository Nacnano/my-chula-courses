def real_upgrade(grade):
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


def index_of(grades, ID):
    for i in range(len(grades)):
        if ID == grades[i][0]:
            return i
    return -1


def upgrade(grades, IDs):
    for ID in IDs:
        i = index_of(grades, ID)
        if i != -1:
            grades[i] = [grades[i][0], real_upgrade(grades[i][1])]
    return grades.sort()


exec(input())
exec(input())
exec(input())
