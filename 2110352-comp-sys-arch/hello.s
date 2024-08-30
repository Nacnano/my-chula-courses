	.file	"hello.c"
gcc2_compiled.:
___gnu_compiled_c:
	.def	___main;	.scl	2;	.type	32;	.endef
.text
LC0:
	.ascii "Hello, World\12\0"
	.align 4
.globl _main
	.def	_main;	.scl	2;	.type	32;	.endef
_main:
	pushl %ebp
	movl %esp,%ebp
	call ___main
	pushl $LC0
	call _printf
	addl $4,%esp
L1:
	movl %ebp,%esp
	popl %ebp
	ret
	.def	_printf;	.scl	2;	.type	32;	.endef
