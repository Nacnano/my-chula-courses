def winner(hand1, hand2):
    if hand1 == hand2:
        return 0
    if hand1 == 'P' and hand2 == 'R' or hand1 == 'R' and hand2 == 'S' or hand1 == 'S' and hand2 == 'P':
        return 1
    return 2


n = int(input())
score = [0, 0, 0]
current_winner = 0

for i in range(3*n):
    hand1, hand2 = input().split()
    score[winner(hand1, hand2)] += 1
    if score[1] >= n:
        current_winner = 1
    elif score[2] >= n:
        current_winner = 2
    if current_winner:
        break

print(score[1], score[2])
if current_winner:
    print("Player " + str(current_winner) + " wins")
else:
    print("Tie")
