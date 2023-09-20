#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T>
T CP::queue<T>::operator[](int idx) {
  //write something here
  //
  // you need to return something
  // return
  if(idx < 0) idx += mSize;
  return mData[(mFront + idx) % mCap];
}

#endif
