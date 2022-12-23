def mosteller(w, h):
    return ((w*h)**0.5) / 60


def du_bois(w, h):
    return 0.007184 * (w**0.425) * (h**0.725)


def fujimoto(w, h):
    return 0.008883 * (w**0.444) * (h**0.663)


def main():
    w = float(input())
    h = float(input())
    mosteller = ((w*h)**0.5) / 60
    du_bois = 0.007184 * (w**0.425) * (h**0.725)
    fujimoto = 0.008883 * (w**0.444) * (h**0.663)
    print("Mosteller =", round(mosteller, 5))
    print("Du Bois =", round(du_bois, 5))
    print("Fujimoto =", round(fujimoto, 5))


exec(input())
