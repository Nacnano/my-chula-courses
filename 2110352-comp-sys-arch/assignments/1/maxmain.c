#include <stdio.h>

int max1(int a, int b) { return (a>b)?a:b;
}
int max2(int a, int b) {
int isaGTb=a>b;
int max;
if (isaGTb)
max=a;
else
max=b;
return max;
}


int main () {
    int a, i;
    for(i=0;i<100000000;i++){ a = max1(1, 2);}
}