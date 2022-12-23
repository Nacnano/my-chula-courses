dict_bid = {}
n = int(input())
buyer_set = set()
time = 0
for i in range(n):
    inputs = input().strip().split()
    if inputs[0] == 'B':
        buyer, product, value = inputs[1:]
        value, time = int(value), int(time)
        buyer_set.add(buyer)
        if product in dict_bid:
            dict_bid[product][buyer] = (value, time)
        else:
            dict_bid[product] = {buyer: (value, time)}
    else:
        buyer, product = inputs[1:]
        dict_bid[product].pop(buyer, None)
    time += 1

max_list = []
for product in dict_bid:
    mx = 0
    mn_time = 1e9
    mx_buyer = None
    for buyer in dict_bid[product]:
        values = dict_bid[product][buyer]
        if values[0] > mx:
            mx = values[0]
            mn_time = values[1]
            mx_buyer = buyer
        elif values[0] == mx:
            if values[1] < mn_time:
                mn_time = values[1]
                mx_buyer = buyer
    max_list += [(product, mx, mx_buyer)]

result = {}
for product, value, buyer in sorted(max_list):
    if buyer in result:
        result[buyer] = (result[buyer][0]+value, result[buyer][1] + [product])
    else:
        result[buyer] = (value, [product])

for buyer in sorted(buyer_set):
    print(buyer, end=": ")
    if buyer in result:
        value, products = result[buyer]
    else:
        value, products = 0, []
    print("$" + str(value), end=" ")
    if len(products):
        print("->", end=" ")
    print(" ".join(products))
