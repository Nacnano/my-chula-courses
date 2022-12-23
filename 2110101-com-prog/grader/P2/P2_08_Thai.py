dict = {0: 'soon',
        1: 'neung',
        2: 'song',
        3: 'sam',
        4: 'si',
        5: 'ha',
        6: 'hok',
        7: 'chet',
        8: 'paet',
        9: 'kao', }


def to_Thai(N):
    out = ""
    if N >= 1000:
        out += dict[N//1000] + ' pun '
        N %= 1000
    if N >= 100:
        out += dict[N//100] + ' roi '
        N %= 100
    if N >= 10:
        t = N//10
        if t == 2:
            out += 'yi'
        elif t == 1:
            out += ''
        else:
            out += dict[t]
        out += ' sip '
        N %= 10
    if N == 0:
        if len(out) == 0:
            return 'soon'
        return out
    if len(out) > 0 and N == 1:
        out += 'et'
    else:
        out += dict[N]
    return out


exec(input().strip())
