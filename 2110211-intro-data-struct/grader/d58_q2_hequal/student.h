#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T,typename Comp >
bool CP::priority_queue<T,Comp>::operator==(const CP::priority_queue<T,Comp> &other) const {
	priority_queue<T, Comp> tmp1(*this), tmp2(other);
  //write your code here
  if(tmp1.size() != tmp2.size()) return false;
  while(!tmp1.empty()){
	if(tmp1.top() != tmp2.top()) return false;
	tmp1.pop();
	tmp2.pop();
  }
  return true; // you can change this line
}

#endif
