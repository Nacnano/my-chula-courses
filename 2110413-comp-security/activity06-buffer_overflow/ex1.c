#include <stdio.h>

/* Prototype function */
void myfunction (int i);

char *p;

int main() {
    printf("&main = %0.16p\n", & main);
    printf("&myfunction = %0.16p\n", &myfunction);
    printf("&&ret_addr = %0.16p\n", &&ret_addr);
    myfunction (12);
ret_addr:
    printf("... end\n");
}

void myfunction (int i) {
    char buf[20]="0123456789012345678";
    printf("&i = %0.16p\n", &i);
    printf("sizeof(pointer) is %d\n",sizeof(p));
    printf("&buf[0] = %0.16p\n", buf);
    for(p=((char *) &i)+64;p>buf;p--) {
        printf("%0.16p: 0x%0.2x\t", p, *(unsigned char*) p);
        if (! ((unsigned int )p %4) )
            printf("\n");
    }
    printf("\n");
}