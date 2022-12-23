n = int(input())
history = {}


def rating(name):
    return int(25*(int(history[name][0])+1)*int(history[name][1])/10**7)


for i in range(n):
    inputs = input().split(" | ")
    mode = inputs[0]
    if mode == 'Play':
        name = inputs[1]
        if name not in history:
            history[name] = inputs[2:]
        else:
            new_rating = 25*(inputs[2]+1)*inputs[3]/10**7
            if new_rating > rating(name):
                history[name] = inputs[2:]
            elif new_rating == rating(name):
                if inputs[2] > history[name][0]:
                    history[name] = inputs[2:]
                elif inputs[2] == history[name][0]:
                    if inputs[3] > history[name][1]:
                        history[name] = inputs[2:]
    elif len(inputs) > 1 and mode == 'Rating':
        if inputs[1] in history:
            print(rating(inputs[1]))
        else:
            print("0")
    elif len(inputs) == 1 and mode == 'Rating':
        all = []
        for name in history:
            all += [rating(name)]
        if len(all) >= 5:
            print(sum(sorted(all)[-4:]))
        else:
            print(sum(all))
    elif mode == 'Detail':
        name = inputs[1]
        if name in history:
            print(" | ".join([name] + history[name] + [str(rating(name))]))
        else:
            print(name+": No play history")
