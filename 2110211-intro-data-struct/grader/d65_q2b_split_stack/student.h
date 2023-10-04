#ifndef __STACK_STUDENT_H__
#define __STACK_STUDENT_H__
#include "stack.h"
#include <algorithm>

template <typename T>
std::vector<std::vector<T>>  CP::stack<T>::split_stack(int k) const {
  //your code here
  std::vector<std::vector<T>> ret(k, std::vector<T>());
  for(int i = 0; i < k;i++){
	int cnt = 0;
	while(i + cnt < mSize){
		ret[i].push_back(mData[mSize - 1 - (i + cnt) ]);
		cnt += k;
	}
  }
  for(auto &x: ret){
	std::reverse(x.begin(), x.end());
  }
  //should return something
  return ret;
}

#endif

