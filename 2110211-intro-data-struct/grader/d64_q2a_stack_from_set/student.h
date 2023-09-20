#ifndef __STACK_STUDENT_H__
#define __STACK_STUDENT_H__
#include "stack.h"

//DO NOT INCLUDE ANYTHING


template <typename T>
CP::stack<T>::stack(typename std::set<T>::iterator first,typename std::set<T>::iterator last) {
  //write your code ONLY here
	auto it = first;
	int cnt = 0;
	while(it != last){
		it++, cnt++;
	}

	mData = new T[cnt];
	mSize = 0;
	mCap = cnt;
	while(first != last){
		push(*(--last));
	}
}

#endif
