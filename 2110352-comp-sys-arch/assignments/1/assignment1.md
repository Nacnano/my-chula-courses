# Assignment 1

## 1. Instruction Analysis

### C code (max)

```c
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

### Assembly code (max)

```x86asm
	.file	"max.c"
gcc2_compiled.:
___gnu_compiled_c:
.text
	.align 4
.globl _max1
	.def	_max1;	.scl	2;	.type	32;	.endef
_max1:
	pushl %ebp
	movl %esp,%ebp
	movl 12(%ebp),%eax
	cmpl 8(%ebp),%eax
	jge L2
	movl 8(%ebp),%eax
L2:
	movl %eax,%eax
	jmp L1
	.p2align 4,,7
L1:
	movl %ebp,%esp
	popl %ebp
	ret
	.align 4
.globl _max2
	.def	_max2;	.scl	2;	.type	32;	.endef
_max2:
	pushl %ebp
	movl %esp,%ebp
	subl $16,%esp
	movl 8(%ebp),%eax
	cmpl 12(%ebp),%eax
	setg %al
	xorl %edx,%edx
	movb %al,%dl
	movl %edx,-4(%ebp)
	cmpl $0,-4(%ebp)
	je L4
	movl 8(%ebp),%eax
	movl %eax,-8(%ebp)
	jmp L5
	.p2align 4,,7
L4:
	movl 12(%ebp),%eax
	movl %eax,-8(%ebp)
L5:
	movl -8(%ebp),%edx
	movl %edx,%eax
	jmp L3
	.p2align 4,,7
L3:
	movl %ebp,%esp
	popl %ebp
	ret
```

- What does the code hint about the kind of instruction set?
  (e.g. Accumulator, Register Memory, Memory Memory,
  Register Register) Please justify your answer.

  Answer: Memory-Register Model because it use 'movl' to move value from memory to register

- Can you tell whether the architecture is either Restricted
  Alignment or Unrestricted Alignment? Please explain
  how you come up with your answer.

  Answer: Restricted because the values are multiples of 4 (4, 8, 12, 16, etc.) 4 bits

- Create a new function (e.g. testMax) to call max1.
  Generate new assembly code. What does the result
  suggest regarding the register saving (caller save vs. callee save)? Please provide your analysis.

  Answer: Callee save because it push base stack pointer meaning creating a new stack frame after getting called

#### C Code (testMax)

```c
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
int testMax(int a, int b){
    return max1(a, b);
}
```

#### Assembly code (testMax)

```x86asm
	.file	"testmax.c"
gcc2_compiled.:
___gnu_compiled_c:
.text
	.align 4
.globl _max1
	.def	_max1;	.scl	2;	.type	32;	.endef
_max1:
	pushl %ebp
	movl %esp,%ebp
	movl 12(%ebp),%eax
	cmpl 8(%ebp),%eax
	jge L2
	movl 8(%ebp),%eax
L2:
	movl %eax,%eax
	jmp L1
	.p2align 4,,7
L1:
	movl %ebp,%esp
	popl %ebp
	ret
	.align 4
.globl _max2
	.def	_max2;	.scl	2;	.type	32;	.endef
_max2:
	pushl %ebp
	movl %esp,%ebp
	subl $16,%esp
	movl 8(%ebp),%eax
	cmpl 12(%ebp),%eax
	setg %al
	xorl %edx,%edx
	movb %al,%dl
	movl %edx,-4(%ebp)
	cmpl $0,-4(%ebp)
	je L4
	movl 8(%ebp),%eax
	movl %eax,-8(%ebp)
	jmp L5
	.p2align 4,,7
L4:
	movl 12(%ebp),%eax
	movl %eax,-8(%ebp)
L5:
	movl -8(%ebp),%edx
	movl %edx,%eax
	jmp L3
	.p2align 4,,7
L3:
	movl %ebp,%esp
	popl %ebp
	ret
	.align 4
.globl _testMax
	.def	_testMax;	.scl	2;	.type	32;	.endef
_testMax:
	pushl %ebp
	movl %esp,%ebp
	movl 12(%ebp),%eax
	pushl %eax
	movl 8(%ebp),%eax
	pushl %eax
	call _max1
	addl $8,%esp
	movl %eax,%edx
	movl %edx,%eax
	jmp L6
	.p2align 4,,7
L6:
	movl %ebp,%esp
	popl %ebp
	ret
```

- How do the arguments be passed and the return value
  returned from a function? Please explain the code.

  Answer: base stack pointer for passing and %eax for returning depends on the conditions

- Find the part of code (snippet) that does comparison and
  conditional branch. Explain how it works.

  Answer: The condition compares the two arguments passed to the max1 function. If the first argument (at [ebp + 8]) is greater than the second argument (at [ebp + 12]), the code inside the conditional block is executed to set %eax to the first argument. Otherwise, %eax already contains the second argument, which is the maximum value.

```x86asm
  _max1:
  	pushl %ebp
  	movl %esp,%ebp
  	movl 12(%ebp),%eax
  	cmpl 8(%ebp),%eax
  	jge L2
  	movl 8(%ebp),%eax
  L2:
  	movl %eax,%eax
  	jmp L1
  	.p2align 4,,7
  L1:
  	movl %ebp,%esp
  	popl %ebp
  	ret
  	.align 4
```

- If max.c is compiled with optimization turned on (using
  “gcc -O2 -S max.c”), what are the differences that you
  may observe from the result (as compared to that without
  optimization). Please provide your analysis

  Answer: Both max1 and max2 codes are the same. It removes the unnecessary return part (L1)

#### Assembly Code (max level 2)

```x86asm
	.file	"max.c"
gcc2_compiled.:
___gnu_compiled_c:
.text
	.align 4
.globl _max1
	.def	_max1;	.scl	2;	.type	32;	.endef
_max1:
	pushl %ebp
	movl %esp,%ebp
	movl 8(%ebp),%edx
	movl 12(%ebp),%eax
	cmpl %edx,%eax
	jge L2
	movl %edx,%eax
L2:
	movl %ebp,%esp
	popl %ebp
	ret
	.align 4
.globl _max2
	.def	_max2;	.scl	2;	.type	32;	.endef
_max2:
	pushl %ebp
	movl %esp,%ebp
	movl 8(%ebp),%edx
	movl 12(%ebp),%eax
	cmpl %eax,%edx
	jle L4
	movl %edx,%eax
L4:
	movl %ebp,%esp
	popl %ebp
	ret
```

- Please estimate the CPU Time required by the max1
  function (using the equation CPI=ICxCPIxTc). If possible,
  create a main function to call max1 and use the time
  command to measure the performance. Compare the
  measure to your estimation.

  Answer: For the optimized version, IC = 10. CPI is around 1 cycle for most instructions. I use 2.6 GHz CPU. So Tc = 1/2.6 GHz

  So CPU Time = 10 \* 1 \* 1/2.6\*10^9 = 3.846 ns

  #### Time (Calling max1 function 100,000,000 times)

  - 0.030s
  - 0.029s
  - 0.032s

- What do you think are the factors that cause the difference? Please provide your analysis.
  (You may find references online regarding the CPI of
  each instruction.)

  Answer:
  The differences were caused by the CPU handling other tasks (system, user, etc).

## 2. Optimization

```c
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

  Answer: Here is the Average Time from running 3 times

  - level 0 : 9.62s
  - level 1 : 8.98s
  - level 2 : 8.94s
  - level 3 : 8.95s

## 3. Analysis

- As suggested by the results in Exercise 2, what kinds of optimization are used by the compiler in each level in
  order to make the program faster? To answer this question,
  use “gcc -S” to generate the assembly code for each level (e.g.
  “gcc -S -O2 fibo.c”) and use this result as a basis for your
  analysis.
  (Depending on your version of the compiler, the result may
  vary.)

  Answer:

  - level 0 : Normal
  - level 1 : Simplifies comparation logics, stores value more efficiently in registers
  - level 2 : Same code as level 1
  - level 3 : Handle printings and minimize redundances when calling the function

#### Assembly Code (fibo level 0)

```x86asm
	.file	"fibo.c"
gcc2_compiled.:
___gnu_compiled_c:
.text
	.align 4
.globl _fibo
	.def	_fibo;	.scl	2;	.type	32;	.endef
_fibo:
	pushl %ebp
	movl %esp,%ebp
	pushl %ebx
	cmpl $0,8(%ebp)
	jg L2
	xorl %eax,%eax
	jmp L1
	.p2align 4,,7
L2:
	cmpl $1,8(%ebp)
	jne L3
	movl $1,%eax
	jmp L1
	.p2align 4,,7
L3:
	movl 8(%ebp),%eax
	decl %eax
	pushl %eax
	call _fibo
	addl $4,%esp
	movl %eax,%ebx
	movl 8(%ebp),%eax
	addl $-2,%eax
	pushl %eax
	call _fibo
	addl $4,%esp
	movl %eax,%eax
	leal (%eax,%ebx),%edx
	movl %edx,%eax
	jmp L1
	.p2align 4,,7
L1:
	movl -4(%ebp),%ebx
	movl %ebp,%esp
	popl %ebp
	ret
	.def	___main;	.scl	2;	.type	32;	.endef
LC0:
	.ascii "fibo of %ld is %ld\12\0"
	.align 4
.globl _main
	.def	_main;	.scl	2;	.type	32;	.endef
_main:
	pushl %ebp
	movl %esp,%ebp
	call ___main
	pushl $0
	pushl $0
	pushl $LC0
	call _printf
	addl $12,%esp
L4:
	movl %ebp,%esp
	popl %ebp
	ret
	.def	_printf;	.scl	2;	.type	32;	.endef
```

#### Assembly Code (fibo level 1 and level 2 have the same code)

```x86asm
	.file	"fibo.c"
gcc2_compiled.:
___gnu_compiled_c:
.text
	.align 4
.globl _fibo
	.def	_fibo;	.scl	2;	.type	32;	.endef
_fibo:
	pushl %ebp
	movl %esp,%ebp
	pushl %esi
	pushl %ebx
	movl 8(%ebp),%ebx
	testl %ebx,%ebx
	jg L2
	xorl %eax,%eax
	jmp L4
	.p2align 4,,7
L2:
	cmpl $1,%ebx
	je L3
	leal -1(%ebx),%eax
	pushl %eax
	call _fibo
	movl %eax,%esi
	leal -2(%ebx),%eax
	pushl %eax
	call _fibo
	addl %esi,%eax
	jmp L4
	.p2align 4,,7
L3:
	movl $1,%eax
L4:
	leal -8(%ebp),%esp
	popl %ebx
	popl %esi
	movl %ebp,%esp
	popl %ebp
	ret
	.def	___main;	.scl	2;	.type	32;	.endef
LC0:
	.ascii "fibo of %ld is %ld\12\0"
	.align 4
.globl _main
	.def	_main;	.scl	2;	.type	32;	.endef
_main:
	pushl %ebp
	movl %esp,%ebp
	call ___main
	pushl $0
	pushl $0
	pushl $LC0
	call _printf
	movl %ebp,%esp
	popl %ebp
	ret
	.def	_printf;	.scl	2;	.type	32;	.endef
```

#### Assembly Code (fibo level 3)

```x86asm
	.file	"fibo.c"
gcc2_compiled.:
___gnu_compiled_c:
	.def	___main;	.scl	2;	.type	32;	.endef
.text
LC0:
	.ascii "fibo of %ld is %ld\12\0"
	.align 4
.globl _fibo
	.def	_fibo;	.scl	2;	.type	32;	.endef
_fibo:
	pushl %ebp
	movl %esp,%ebp
	pushl %esi
	pushl %ebx
	movl 8(%ebp),%ebx
	testl %ebx,%ebx
	jg L2
	xorl %eax,%eax
	jmp L1
	.p2align 4,,7
L2:
	cmpl $1,%ebx
	je L3
	leal -1(%ebx),%eax
	pushl %eax
	call _fibo
	movl %eax,%esi
	leal -2(%ebx),%eax
	pushl %eax
	call _fibo
	addl %esi,%eax
	jmp L6
	.p2align 4,,7
L3:
	movl $1,%eax
L6:
L1:
	leal -8(%ebp),%esp
	popl %ebx
	popl %esi
	movl %ebp,%esp
	popl %ebp
	ret
	.align 4
.globl _main
	.def	_main;	.scl	2;	.type	32;	.endef
_main:
	pushl %ebp
	movl %esp,%ebp
	call ___main
	pushl $0
	pushl $0
	pushl $LC0
	call _printf
	movl %ebp,%esp
	popl %ebp
	ret
	.def	_printf;	.scl	2;	.type	32;	.endef
```
