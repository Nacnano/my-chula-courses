import math
w = float(input())
h = float(input())

print((w*h)**(1/2)/60)
print(0.024265*w**0.5378*h**0.3964)
print(0.0333*w**(0.6157-0.0188*math.log10(w))*h**0.3)
