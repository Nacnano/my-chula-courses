balls = {
    'X': 0,
    'R': 1,
    'Y': 2,
    'G': 3,
    'W': 4,
    'B': 5,
    'P': 6,
    'K': 7}


def add(s):
    for ball in s[1:]:
        score[s[0]] += balls[ball]


s = input()
score = {'1': 0, '2': 0}
while s[1] != 'K':
    add(s)
    s = input()
add(s)

print(score['1'], score['2'])
if score['1'] == score['2']:
    print('Tie')
else:
    print('Player', 1+(score['1'] < score['2']), 'wins')
