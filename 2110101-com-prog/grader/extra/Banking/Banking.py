n = int(input())
accounts = {}
names = {}
for i in range(n):
    name, id, amount = input().split()
    accounts[id] = float(amount)
    names[id] = name


def output(id):
    amount = str(accounts[id])
    print(names[id], "("+id+")", amount.rstrip('0').rstrip('.')) if '.' in amount else amount


while True:
    s = input()
    if s == "exit":
        break
    inputs = s.split()
    name, id, do = inputs[:3]
    if do == "deposit" and id not in accounts:
        accounts[id] = float(inputs[3])
        names[id] = name
        output(id)
        continue
    if id not in accounts:
        print("Transaction Failed")
        continue
    if names[id] != name:
        print("Transaction Failed")
        continue
    if do == "deposit":
        accounts[id] += float(inputs[3])
        output(id)
    elif do == "withdraw":
        amount = float(inputs[3])
        if amount > accounts[id]:
            print("Transaction Failed")
            continue
        accounts[id] -= amount
        output(id)
    elif do == "transfer":
        if inputs[3] not in accounts:
            print("Transaction Failed")
            continue
        amount = float(inputs[4])
        if amount > accounts[id]:
            print("Transaction Failed")
            continue
        accounts[id] -= amount
        accounts[inputs[3]] += amount
        output(id)
        output(inputs[3])
