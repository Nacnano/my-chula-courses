n = int(input())
price = {}
for i in range(n):
    name, value = input().split()
    price[name] = float(value)

total = 0
count = {}
m = int(input())
for i in range(m):
    name, number = input().split()
    number = float(number)
    if name in price:
        if name in count:
            count[name] += number*price[name]
        else:
            count[name] = number*price[name]
        total += price[name]*number

if len(count) == 0:
    print('No ice cream sales')
else:
    list = []
    max = -1
    for key in count:
        if count[key] > max:
            max = count[key]
            list = [key]
        elif count[key] == max:
            list.append(key)
    print('Total ice cream sales:', total)
    print('Top sales: ', end='')
    list.sort()
    for i in range(len(list)-1):
        print(list[i], end=', ')
    print(list[-1])
