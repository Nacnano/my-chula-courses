#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T>
bool CP::vector<T>::operator<(const CP::vector<T> &other) const {
  //write your code here
  // if you use std::vector, your score will be half (grader will report score BEFORE halving)
	if(size() == 0 && other.size() > 0) return true;
	else if (size() > 0 && other.size() == 0) return false;
	if(size() > 0 && other.size() > 0){
		for(int i = 0;i < std::min(size(), other.size());i++){
			if(mData[i] < other[i]) return true;
			else if(mData[i] > other[i]) return false;
		}
	}
		return size() < other.size();
}

#endif
