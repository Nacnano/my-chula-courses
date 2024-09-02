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
