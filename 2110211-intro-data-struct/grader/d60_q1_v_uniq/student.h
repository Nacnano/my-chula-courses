#ifndef __STUDENT_H_
#define __STUDENT_H_
#include<set>
//you can include any other file here
//you are allow to use any data structure


template <typename T>
void CP::vector<T>::uniq() {
  //do someting here
	std::set<T> ss;
	int newSize = 0;
	for(int i = 0 ;i<mSize;i++){
		if(ss.find(mData[i]) == ss.end()){
			mData[newSize++] = mData[i];
			ss.insert(mData[i]);
		}
	}
	mSize = newSize;
}

#endif
