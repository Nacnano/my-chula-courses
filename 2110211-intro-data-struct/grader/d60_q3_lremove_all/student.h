#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T>
void CP::list<T>::remove_all(const T& value) {
  //write your code here
  node *n = mHeader->next;

  while(n != mHeader){
	if(n->data == value){
		node *tmp = n->next;
		n->prev->next = n->next;
		n->next->prev = n->prev;
		delete n;
		mSize--;
		n = tmp;
	}
	else {
		n = n->next;
	}
  }

}

#endif
