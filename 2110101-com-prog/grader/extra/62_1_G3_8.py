n = int(input().strip())
parties = []
for i in range(n):
    parties += [input().strip()]

partyOf = {}
memberInParty = {}
n = int(input().strip())
for i in range(n):
    name, party = input().strip().split()
    partyOf[name] = party
    if party in memberInParty:
        memberInParty[party] += [name]
    else:
        memberInParty[party] = [name]

n = int(input().strip())
results = {}
individual = {}
for i in range(n):
    name, vote = input().strip().split()
    individual[name] = vote
    party = partyOf[name]
    if party in results:
        if vote in results[party]:
            results[party][vote] += 1
        else:
            results[party][vote] = 1
    else:
        results[party] = {vote: 1}
types = ['Y', 'N', 'X']
for party in parties:
    print(party)
    if party not in results:
        print("Inconclusive")
        continue

    result = []
    for type in types:
        if type in results[party]:
            count = results[party][type]
        else:
            count = 0
        result += [(count, type)]
    result.sort()
    if result[-1][0] == result[-2][0]:
        print("Inconclusive")
        continue
    cobras = []
    for member in memberInParty[party]:
        if member not in individual:
            continue
        if individual[member] != result[-1][1]:
            cobras += [member]
    if len(cobras):
        print(", ".join(sorted(cobras)))
    else:
        print("No cobra")
