#ifndef __STUDENT_H__
#define __STUDENT_H__

#include <algorithm>
#include <vector>
#include "priority_queue.h"

template <typename T,typename Comp >
std::vector<T> CP::priority_queue<T,Comp>::at_level(size_t k) const {
  //write your code here
  //can include anything
  int idx = 1;
  while(k--){
	idx *= 2;
  }
  idx--;
  std::vector<T> r;
  for(int i = idx;i < std::min((int)mSize, 2 * idx + 1);i++) {
	r.push_back(mData[i]);
  }
  sort(r.rbegin(), r.rend(),mLess);
  return r;
}

#endif

