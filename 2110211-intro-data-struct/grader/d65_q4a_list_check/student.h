#ifndef __STUDENT_H__
#define __STUDENT_H__


template <typename T>
bool CP::list<T>::check() {
  //your code here
  iterator it = begin();
  for(int i = 0; i < mSize; i++){
	it++;
	if(it == NULL) return false;
  }
  if(it != end()) return false;

  it = end();
  for(int i = 0; i < mSize; i++){
	it--;
	if(it == NULL) return false;
  }
  if(it != begin()) return false;
  return true;
}


#endif
