class Card:
    def __init__(self, value, suit):
        self.value = value
        self.suit = suit

    def __str__(self):
        return '(' + self.value + ' ' + self.suit + ')'

    def next1(self):
        values = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2']
        suits = ['club', 'diamond', 'heart', 'spade']
        value_key, suit_key = values.index(self.value), suits.index(self.suit)
        value_key = (value_key+1) % 13
        suit_key = (suit_key+1) % 4
        value_key -= suit_key != 0
        return Card(values[value_key], suits[suit_key])

    def next2(self):
        tmp = self.next1()
        self.value = tmp.value
        self.suit = tmp.suit


n = int(input())
cards = []
for i in range(n):
    value, suit = input().split()
    cards.append(Card(value, suit))
for i in range(n):
    print(cards[i].next1())
print("----------")
for i in range(n):
    print(cards[i])
print("----------")
for i in range(n):
    cards[i].next2()
    cards[i].next2()
    print(cards[i])
