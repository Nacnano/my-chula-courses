#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>
#include <iostream>


template <typename T>
void CP::queue<T>::back_to_front() {
  //write your code here
  mFront = (mFront - 1 + mCap) % mCap;
  mData[mFront] = mData[(mFront + mSize) % mCap];
}

#endif
