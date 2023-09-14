#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>

template <typename T>
T& CP::vector_no_move<T>::operator[](int idx) {
  //your code here
  int it = upper_bound(aux.begin(), aux.end(), idx) - aux.begin();
  if(it) return mData[it][idx - aux[it-1]];
  return mData[it][idx];
}

template <typename T>
void CP::vector_no_move<T>::expand_hook() {
  //your code here
  aux.push_back(mCap);
  //you MAY need this function
}

#endif
