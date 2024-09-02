#include <stdio.h>

long fibo(long a) {
if (a<=0L) {
return 0L;
}
if (a==1L) {
return 1L;
}
return fibo(a-1L)+fibo(a-2L);
}

int main (int argc,char *argv[]) {
for (long i=1L;i<45L;i++) {
long f=fibo(i);
printf("fibo of %ld is %ld\n",i,f);
}
}
