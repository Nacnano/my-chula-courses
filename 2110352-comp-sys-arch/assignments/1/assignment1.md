# Assignment 1

## 1. Instruction Analysis

```
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
```

- What does the code hint about the kind of instruction set?
  (e.g. Accumulator, Register Memory, Memory Memory,
  Register Register) Please justify your answer.

- Can you tell whether the architecture is either Restricted
  Alignment or Unrestricted Alignment? Please explain
  how you come up with your answer.

- Create a new function (e.g. testMax) to call max1.
  Generate new assembly code. What does the result
  suggest regarding the register saving (caller save vs.
  callee save)? Please provide your analysis.
- How do the arguments be passed and the return value
  returned from a function? Please explain the code.
  Find the part of code (snippet) that does comparison and
  conditional branch. Explain how it works.

- If max.c is compiled with optimization turned on (using
  “gcc -O2 -S max.c”), what are the differences that you
  may observe from the result (as compared to that without
  optimization). Please provide your analysis
- Please estimate the CPU Time required by the max1
  function (using the equation CPI=ICxCPIxTc). If possible,
  create a main function to call max1 and use the time
  command to measure the performance. Compare the
  measure to your estimation.
- What do you think are the factors that cause the difference? Please provide your
  analysis.
  (You may find references online regarding the CPI of
  each instruction.)

## 2. Optimization

```
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
```

- We will use simple fibonacci calculation as a
  benchmark. Please measure the execution time (using the time command) of this given program when compiling with
  optimization level 0 (no optimization), level 1, level 2 and level 3. (Note that some compilers do similar optimization for all
  level 1, level 2 and level 3. If that is the case, you will see no
  difference after level 1.) You may want to run each program a
  few times and use the average value as a result.

## 3. Analysis

- As suggested by the results in Exercise 2, what kinds of optimization are used by the compiler in each level in
  order to make the program faster? To answer this question,
  use “gcc -S” to generate the assembly code for each level (e.g.
  “gcc -S -O2 fibo.c”) and use this result as a basis for your
  analysis.
  (Depending on your version of the compiler, the result may
  vary.)
