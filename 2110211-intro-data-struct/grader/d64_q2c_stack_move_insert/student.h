#ifndef __STUDENT_H__
#define __STUDENT_H__

template <typename T>
void CP::stack<T>::moveInsert(int k,CP::stack<T> &s2, int m) {
  //your code here
	CP::stack<T> tmp, tmp2;
	while(!empty() && k--){
		tmp.push(top());
		pop();
	}
	while(!s2.empty() && m--){
		tmp2.push(s2.top());
		s2.pop();
	}
	while(!tmp2.empty()){
		push(tmp2.top());
		tmp2.pop();
	}
	while(!tmp.empty()){
		push(tmp.top());
		tmp.pop();
	}
}
#endif
