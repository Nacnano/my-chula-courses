#ifndef __STUDENT_H__
#define __STUDENT_H__

#include <algorithm>
#include <vector>
#include "priority_queue.h"

#define max(x, y) mLess(x, y) ? y : x

template <typename T,typename Comp >
T CP::priority_queue<T,Comp>::get_kth(size_t k) const {
  //write your code here
  //can include anything
  if(k == 1) return mData[0];
  if(k == 2) return max(mData[1], mData[2]);
  T x = max(mData[3], mData[4]), y = max(mData[5], mData[6]);
  if(mLess(mData[1],mData[2])) return max(mData[1], y);
  return max(mData[2], x);
}

#endif
