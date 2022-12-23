n = int(input())
prices = [-1]
for i in range(n):
    inputs = [float(x) for x in input().split(",")]
    prices += inputs


def ema(t, t0):
    a = 2/(1+t0)
    if t == t0:
        return sum(prices[1:t0+1])/t0
    return a*prices[t] + ema(t-1, t0)*(1-a)


if len(prices) < 14:
    print("No results")
    exit(0)

buy = ema(14, 7) < ema(14, 14)
results = []
for i in range(15, len(prices)):
    fast = ema(i, 7)
    slow = ema(i, 14)
    print(i, prices[i], fast, slow)
    if buy:
        if fast > slow:
            results += ["BUY at "+str(prices[i])]
            buy = not buy
    else:
        if slow > fast:
            results += ["SELL at "+str(prices[i])]
            buy = not buy
if len(results):
    for result in results:
        print(result)
else:
    print("No results")
