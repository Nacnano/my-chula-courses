#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>

template <typename T>
void CP::vector<T>::swap(CP::vector<T> &other) {
  // your code here
	std::swap(this->mData, other.mData);
	std::swap(this->mSize, other.mSize);
	std::swap(this->mCap, other.mCap);
}

#endif
