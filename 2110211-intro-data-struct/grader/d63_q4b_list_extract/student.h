#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>

template <typename T>
void CP::list<T>::extract(const T& value,iterator a, iterator b,CP::list<T>& output) {
  //write your code here

  while(a != b){
	if(*a == value) {
		node *new_node = new node(value, NULL, NULL);
		// output.insert(output.begin(), value);
		auto it_begin = output.mHeader->next;
		node *n = new node(value,output.mHeader, it_begin);
		output.mHeader->next = n;
		it_begin->prev = n;
		output.mSize++;


		// a = erase(a);
		auto it = a;
		iterator tmp(it.ptr->next);
		it.ptr->prev->next = it.ptr->next;
		it.ptr->next->prev = it.ptr->prev;
		delete it.ptr;
		mSize--;
		a = tmp;
	}
	else a++;
  }
}

#endif
