#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <stdio.h>
#include "priority_queue.h"
#include <iostream>

template <typename T,typename Comp >
int CP::priority_queue<T,Comp>::height() const {
  //write your code here
	// if(!size()) return -1;
	int ans = 0, val = 1;
	while(val <= size()){
		ans++, val *= 2;
	}
	return ans - 1;
}

#endif

