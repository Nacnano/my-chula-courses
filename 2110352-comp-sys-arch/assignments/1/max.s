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
