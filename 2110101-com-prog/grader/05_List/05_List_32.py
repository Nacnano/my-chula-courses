q = list()
n = int(input())
ticket, total_wait_time, next_ticket, next_start_time, it, order_count = "", 0, "", 0, 0, 0
for k in range(n):
    c = input().split()
    if c[0] == 'reset':
        ticket = int(c[1])
    elif c[0] == 'new':
        print("ticket", ticket)
        q.append([ticket, int(c[1])])
        ticket += 1
    elif c[0] == 'next':
        print("call", q[it][0])
        next_ticket, next_start_time = q[it]
        it += 1
    elif c[0] == 'order':
        wait_time = int(c[1])-next_start_time
        total_wait_time += wait_time
        order_count += 1
        print("qtime", next_ticket, wait_time)
    elif c[0] == 'avg_qtime':
        print("avg_qtime", round(total_wait_time/order_count, 4))
