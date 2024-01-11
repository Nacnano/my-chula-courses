#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "list.h"
#include <vector>;

template <typename T>
void CP::list<T>::block_swap(iterator a1, iterator a2, iterator b1, iterator b2) {
	// write your code here
	if(a1 == b2) {
		std::swap(a1,b1);
		std::swap(a2,b2);
	}

	if(a2 == b1){
        node* m = a2.ptr->prev;
        a1.ptr->prev->next = a2.ptr;
        a2.ptr->prev = a1.ptr->prev;
        b2.ptr->prev->next = a1.ptr;
        a1.ptr->prev = b2.ptr->prev;
        m->next = b2.ptr;
        b2.ptr->prev = m;
	}
	else {
        std::swap(a1.ptr->prev->next,b1.ptr->prev->next);
        std::swap(a1.ptr->prev,b1.ptr->prev);
        std::swap(a2.ptr->prev->next,b2.ptr->prev->next);
        std::swap(a2.ptr->prev,b2.ptr->prev);
	}
}

#endif
