import math


def total(pocket):
    ret = 0
    for cash in pocket:
        ret += cash*pocket[cash]
    return ret


def take(pocket, money_in):
    for cash in money_in:
        if cash in pocket:
            pocket[cash] += money_in[cash]
        else:
            pocket[cash] = money_in[cash]
    return money_in


def pay(pocket, amt):
    cash_list = sorted(list(pocket.keys()), reverse=True)
    remove = {}
    for cash in cash_list:
        if amt >= cash*pocket[cash]:
            amt -= cash*pocket[cash]
            remove[cash] = pocket[cash]
        elif cash <= amt:
            remove[cash] = amt//cash
            amt -= cash*(amt//cash)
    if amt != 0:
        return {}
    for cash in remove:
        pocket[cash] -= remove[cash]
    return remove


exec(input().strip())
