#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <stdio.h>
#include "priority_queue.h"
#include <iostream>

template <typename T,typename Comp >
bool CP::priority_queue<T,Comp>::find(T k) const {
  //your code here
  for(int i = 0;i < size();i++){
	if(mData[i] == k) return true;
  }
  return false;
}

template <typename T,typename Comp >
int CP::priority_queue<T,Comp>::find_level(T k) const {
  //your code here
  int pos = -1;
  for(int i = size() - 1;i >= 0;i--){
	if(mData[i] == k) {
		pos = i;
		break;
	}
  }
  if(pos == -1) return -1;

  int ans = 0;
  while(pos){
	pos = (pos - 1) / 2, ans++;
  }
  return ans;
}

#endif

