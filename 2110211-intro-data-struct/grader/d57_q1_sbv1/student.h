#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "stack.h"
#include <iostream>

template <typename T>
size_t CP::stack<T>::size() const {
	return v.size();
  //write your code here
}

template <typename T>
const T& CP::stack<T>::top() const {
	return *(--v.end());
  //write your code here
}

template <typename T>
void CP::stack<T>::push(const T& element) {
	v.push_back(element);
  //write your code here
}

template <typename T>
void CP::stack<T>::pop() {
	v.pop_back();
  //write your code here
}

#endif
