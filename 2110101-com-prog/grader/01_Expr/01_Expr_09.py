def str2hms(hms_str):
    t = hms_str.split(':')
    return int(t[0]), int(t[1]), int(t[2])


def hms2str(h, m, s):
    return ('0'+str(h))[-2:] + ':' + \
        ('0'+str(m))[-2:] + ':' + \
        ('0'+str(s))[-2:]


def to_sec(h, m, s):
    return h*60*60+m*60+s


def to_hms(s):
    h = s//3600
    m = s % 3600//60
    s = s % 60
    return h, m, s


def diff(h1, m1, s1, h2, m2, s2):
    t = to_sec(h2, m2, s2) - to_sec(h1, m1, s1)
    return to_hms(t)


def main():
    h1, m1, s1 = str2hms(input())
    h2, m2, s2 = str2hms(input())
    hd, md, sd = to_hms(to_sec(h2, m2, s2)-to_sec(h1, m1, s1))
    print(hms2str(hd, md, sd))


exec(input())
