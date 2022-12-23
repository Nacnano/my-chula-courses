n = int(input())
dict = {}
for i in range(n):
    song, artist, genre, time = input().strip().split(', ')
    mins, secs = time.split(':')
    if genre in dict:
        dict[genre] += 60*int(mins)+int(secs)
    else:
        dict[genre] = 60*int(mins)+int(secs)

list = []
for key in dict:
    list.append((dict[key], key))
list = sorted(list, reverse=True)

for i in range(min(len(list), 3)):
    time, genre = list[i]
    print(genre, '-->', time//60, end=':')
    if time % 60 < 10:
        print(0, end='')
    print(time % 60)
