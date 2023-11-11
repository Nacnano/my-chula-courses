#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "stack.h"

template <typename T>
void CP::stack<T>::reverse(size_t first, size_t last){
	// write your code here
    first = std::max((size_t) 0, first);
    last = std::min(mSize - 1, last);
    while(first < last){
        std::swap(mData[mSize - 1 - first++], mData[mSize - 1 -last--]);
    }
}

#endif
