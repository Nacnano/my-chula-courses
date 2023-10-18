#ifndef __STUDENT_H_
#define __STUDENT_H_
#include <algorithm>

template <typename T>
void CP::list<T>::merge(CP::list<CP::list<T>> &ls) {
  //write your code here
	auto it = ls.begin();
	while(it != ls.end()){
		mHeader->prev->next = it->mHeader->next;
		it->mHeader->next->prev = mHeader->prev;
		mHeader->prev = it->mHeader->prev;
		it->mHeader->prev->next = mHeader;
		it->mHeader->prev = it->mHeader;
		it->mHeader->next = it->mHeader;

		mSize += (*it).size();
		(*it).mSize = 0;
		it++;
	}
}

#endif
