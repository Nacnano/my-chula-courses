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
