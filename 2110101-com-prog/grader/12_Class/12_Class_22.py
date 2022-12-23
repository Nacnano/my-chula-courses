class Card:
    def __init__(self, value, suit):
        self.value = value
        self.suit = suit

    def __str__(self):
        return '(' + self.value + ' ' + self.suit + ')'

    def getScore(self):
        if self.value == 'A':
            return 1
        if self.value.isdigit():
            return int(self.value)
        return 10

    def sum(self, other):
        return (self.getScore() + other.getScore()) % 10

    def __lt__(self, rhs):
        score = {'3': 1,
                 '4': 2,
                 '5': 3,
                 '6': 4,
                 '7': 5,
                 '8': 6,
                 '9': 7,
                 '10': 8,
                 'J': 9,
                 'Q': 10,
                 'K': 11,
                 'A': 12,
                 '2': 13
                 }
        if self.value != rhs.value:
            return score[self.value] < score[rhs.value]
        return self.suit < rhs.suit


n = int(input())
cards = []
for i in range(n):
    value, suit = input().split()
    cards.append(Card(value, suit))
for i in range(n):
    print(cards[i].getScore())
print("----------")
for i in range(n-1):
    print(Card.sum(cards[i], cards[i+1]))
print("----------")
cards.sort()
for i in range(n):
    print(cards[i])
