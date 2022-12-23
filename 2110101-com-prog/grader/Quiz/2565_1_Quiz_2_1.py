def score(c):
    if c in ["A", "E", "I", "L", "N", "O", "R", "S", "T", "U"]:
        return 1
    if c in ["D", "G"]:
        return 2
    if c in ["B", "C", "M", "P"]:
        return 3
    if c in ["F", "H", "V", "W", "Y"]:
        return 4
    if c == 'K':
        return 5
    if c in ["J", "X"]:
        return 8
    if c in ["Q", "Z"]:
        return 10


words = []
for s in input().strip().split():
    total = 0
    for c in s:
        total += score(c)
    words += [(-total, s)]
for total, word in sorted(words):
    print(word, -total)
