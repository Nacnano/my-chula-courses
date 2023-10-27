#ifndef __STUDENT_H__
#define __STUDENT_H__


template <typename T>
bool CP::list<T>::check() {
  //your code here
  node *it = mHeader;
  for(int i = 0; i <= mSize; i++){
	if(it->next == NULL || it->prev == NULL) return false;
	if(it->next->prev != it || it->prev->next != it) return false;
	it = it->next;
  }
  if(it != mHeader) return false;
  return true;
}


#endif
