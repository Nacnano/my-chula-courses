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
	jmp L14
	.p2align 4,,7
L3:
	movl $1,%eax
L14:
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
	pushl %esi
	pushl %ebx
	call ___main
	movl $1,%ebx
	.p2align 4,,7
L8:
	testl %ebx,%ebx
	jg L9
	xorl %eax,%eax
	jmp L10
	.p2align 4,,7
L9:
	cmpl $1,%ebx
	jne L11
	movl $1,%eax
	jmp L10
	.p2align 4,,7
L11:
	leal -1(%ebx),%eax
	pushl %eax
	call _fibo
	movl %eax,%esi
	leal -2(%ebx),%eax
	pushl %eax
	call _fibo
	addl %esi,%eax
	addl $8,%esp
L10:
	pushl %eax
	pushl %ebx
	pushl $LC0
	call _printf
	addl $12,%esp
	incl %ebx
	cmpl $44,%ebx
	jle L8
	leal -8(%ebp),%esp
	popl %ebx
	popl %esi
	movl %ebp,%esp
	popl %ebp
	ret
	.def	_printf;	.scl	2;	.type	32;	.endef
