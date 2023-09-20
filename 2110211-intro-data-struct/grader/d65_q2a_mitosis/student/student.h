#ifndef __STACK_STUDENT_H__
#define __STACK_STUDENT_H__
#include "stack.h"

template <typename T>
void CP::stack<T>::mitosis(int a, int b)
{
	CP::stack<T> tmp;
	int i=0;
	while(i++ < a){
		tmp.push(top());
		pop();
	}
	while(i++ <= b + 1){
		tmp.push(top());
		tmp.push(top());
		pop();
	}
	while(!tmp.empty()){
		push(tmp.top());
		tmp.pop();
	}

}

#endif
