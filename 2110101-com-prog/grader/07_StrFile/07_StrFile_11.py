word = input()

if word[-1] == 's' or word[-1] == 'x' or word[-2:] == 'ch':
    word += 'es'
elif word[-1] == 'y' and word[-2] not in ['a', 'e', 'i', 'o', 'u']:
    word = word[0:-1]
    word += 'ies'
else:
    word += 's'

print(word)
