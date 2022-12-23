data = {'2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz',
        '0': ' '}
t2k, k2t = {}, {}
for key in data:
    s = data[key]
    for i in range(len(s)):
        t2k[s[i]] = key*(i+1)
        k2t[key*(i+1)] = s[i]


def text2keys(text):
    ret = ''
    for c in text.lower():
        if c in t2k:
            ret += t2k[c] + ' '
    return ret.strip()


def keys2text(keys):
    ret = ''
    for key in keys.split():
        ret += k2t[key]
    return ret


exec(input().strip())
