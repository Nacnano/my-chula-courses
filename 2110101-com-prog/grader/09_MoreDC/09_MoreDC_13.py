n = int(input())
winner_set, loser_set = set(), set()
for i in range(n):
    winner, loser = input().split()
    winner_set.add(winner)
    loser_set.add(loser)
only_win = winner_set.difference(loser_set)
print(sorted(list(only_win)))
