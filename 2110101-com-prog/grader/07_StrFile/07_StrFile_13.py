s = input().lower()
new_s = ''
for c in s:
    if c.isalpha() or c.isdigit():
        new_s += c
    else:
        new_s += ' '
s = new_s.split()


def print_check(c):
    global first
    if c.isalpha() or c.isdigit():
        first = True
        print(c, end='')


for c in s[0]:
    print_check(c)


for w in s[1:]:
    first = False
    for c in w:
        if first:
            print_check(c)
        else:
            print_check(c.upper())
