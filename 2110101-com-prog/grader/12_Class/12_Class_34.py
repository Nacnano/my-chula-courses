class piggybank:
    def __init__(self):
        self.count = 0
        self.coins = {}

    def add(self, v, n):
        if n+self.count > 100:
            return False
        v = float(v)
        if v not in self.coins:
            self.coins[v] = 0
        self.coins[v] += n
        self.count += n
        return True

    def __float__(self):
        sum = 0.0
        for value in self.coins:
            sum += value*self.coins[value]
        return sum

    def __str__(self):
        if len(self.coins) == 0:
            return '{}'
        s = '{'
        list = []
        for value in self.coins:
            list.append([value, self.coins[value]])
        list.sort()
        for value, amount in list:
            s += str(value)+":"+str(amount)+', '
        return s[:-2]+'}'


cmd1 = input().split(';')
cmd2 = input().split(';')
p1 = piggybank()
p2 = piggybank()
for c in cmd1:
    eval(c)
for c in cmd2:
    eval(c)
