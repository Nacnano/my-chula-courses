s = input()
vote_count = {}
voted = {}
ota_count = {}
kami_count = {}
kamiOf = {}
no_dup = {}
all_ooshi = set()
while len(s) > 1:
    ota, ooshi, count = s.split()
    count = int(count)
    all_ooshi.add(ooshi)
    if (ota, ooshi) in no_dup:
        no_dup[(ota, ooshi)] += count
    else:
        no_dup[(ota, ooshi)] = count
    s = input()
list = []
for ota, ooshi in no_dup:
    count = no_dup[(ota, ooshi)]
    if ooshi in vote_count:
        vote_count[ooshi] += count
        if ota not in voted[ooshi]:
            ota_count[ooshi] += 1
            voted[ooshi][ota] = 1

    else:
        vote_count[ooshi] = count
        ota_count[ooshi] = 1
        voted[ooshi] = {ota: 1}
    if ota in kamiOf:
        if count > kamiOf[ota][1]:
            kamiOf[ota] = (ooshi, count)
        elif count == kamiOf[ota][1]:
            if ooshi < kamiOf[ota][0]:
                kamiOf[ota] = (ooshi, count)
    else:
        kamiOf[ota] = (ooshi, count)
for ota in kamiOf:
    kami, count = kamiOf[ota]
    if kami in kami_count:
        kami_count[kami] += 1
    else:
        kami_count[kami] = 1

ans = []
ans_ooshi = set()
if s == "1":
    for ooshi in vote_count:
        ans += [(-vote_count[ooshi], ooshi)]
        ans_ooshi.add(ooshi)
elif s == "2":
    for ooshi in ota_count:
        ans += [(-ota_count[ooshi], ooshi)]
        ans_ooshi.add(ooshi)
elif s == "3":
    for ooshi in kami_count:
        ans += [(-kami_count[ooshi], ooshi)]
        ans_ooshi.add(ooshi)
for ooshi in all_ooshi.difference(ans_ooshi):
    ans += [(0, ooshi)]
ans2 = []
for count, ooshi in sorted(ans):
    ans2 += [ooshi]

print(", ".join(ans2[:3]))
