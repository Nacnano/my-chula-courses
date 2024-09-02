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
