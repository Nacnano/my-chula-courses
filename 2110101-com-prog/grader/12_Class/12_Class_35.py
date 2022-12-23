class roman:
    def __init__(self, r):
        if type(r) == str:
            self.s = r
            self.i = int(self)
        else:
            self.i = r
            self.s = str(self)

    def __lt__(self, rhs):
        return int(self) < int(rhs)

    def __str__(self):
        key = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
        ans = ""
        s = str(self.i)
        while len(s) < 4:
            s = '0'+s
        ans += int(s[0])*'M'
        if s[1] == '9':
            ans += 'CM'
        elif s[1] == '4':
            ans += 'CD'
        elif int(s[1]) >= 5:
            ans += 'D'+'C'*(int(s[1])-5)
        else:
            ans += 'C'*int(s[1])

        if s[2] == '9':
            ans += 'XC'
        elif s[2] == '4':
            ans += 'XL'
        elif int(s[2]) >= 5:
            ans += 'L'+'X'*(int(s[2])-5)
        else:
            ans += 'X'*int(s[2])

        if s[3] == '9':
            ans += 'IX'
        elif s[3] == '4':
            ans += 'IV'
        elif int(s[3]) >= 5:
            ans += 'V'+'I'*(int(s[3])-5)
        else:
            ans += 'I'*int(s[3])
        return ans

    def __int__(self):
        key = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
        cnt = 0
        ans = 0
        for i in range(len(self.s)-1):
            cnt += key[self.s[i]]
            if key[self.s[i]] < key[self.s[i+1]]:
                ans -= cnt
                cnt = 0
            elif key[self.s[i]] > key[self.s[i+1]]:
                ans += cnt
                cnt = 0
        cnt += key[self.s[-1]]
        ans += cnt
        return ans

    def __add__(self, rhs):
        return roman(int(self)+int(rhs))


t, r1, r2 = input().split()
a = roman(r1)
b = roman(r2)
if t == '1':
    print(a < b)
elif t == '2':
    print(int(a), int(b))
elif t == '3':
    print(str(a), str(b))
elif t == '4':
    print(int(a + b))
else:
    print(str(a + b))
