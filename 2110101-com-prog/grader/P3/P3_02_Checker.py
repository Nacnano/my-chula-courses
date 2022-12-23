pos = input().strip()
if len(pos) <= 3:
    row = pos[0]
    col = pos[1:]
else:
    inputs = pos.split(',')
    for x in inputs:
        if 'col' in x:
            col = x[x.find('=')+1:].strip()
        elif 'row' in x:
            row = x[x.find('=')+1:].strip()

valid_row = row.isalpha() and len(row) == 1
valid_col = True
try:
    col = int(col)
    valid_col = 1 <= col <= 52
except:
    valid_col = False


if valid_col and not valid_row:
    print("Invalid row")
elif not valid_col and valid_row:
    print("Invalid column")
elif not valid_col and not valid_row:
    print("Invalid row and column")
if not valid_col or not valid_row:
    exit(0)

if 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.find(row) % 2 == col % 2:
    print('Black')
else:
    print('White')
