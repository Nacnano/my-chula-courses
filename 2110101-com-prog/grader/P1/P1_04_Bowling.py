def score_next2(next1, next2):
    if next2 == '/':
        return 10
    return score(next1)+score(next2)


def score(x):
    if x == 'X':
        return 10
    return int(x)


result = input().strip()
target = int(input())
total_score = 0
score_at_round = [0]
i = 0
while True:
    this_round_score = 0
    first, second = result[i:i+2]
    if len(score_at_round) == 10:
        break
    if first == 'X':
        this_round_score = 10+score_next2(second, result[i+2])
        i += 1
    elif second == '/':
        this_round_score = 10+score(result[i+2])
        i += 2
    else:
        this_round_score = score(first)+score(second)
        i += 2
    score_at_round.append(this_round_score)
    total_score += this_round_score


last_round = result[i:]
if len(last_round) == 2:
    this_round_score = score(last_round[0]) + score(last_round[1])
elif last_round[0] == 'X':
    this_round_score = 10 + score_next2(last_round[1], last_round[2])
else:
    this_round_score = 10 + score(last_round[2])
score_at_round.append(this_round_score)
total_score += this_round_score

if target >= 1 and target <= 10:
    print(score_at_round[target])
else:
    print(total_score)
