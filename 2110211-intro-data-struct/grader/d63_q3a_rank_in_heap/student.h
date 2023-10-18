#ifndef __STUDENT_H_
#define __STUDENT_H_

using namespace std;

template <typename T,typename Comp>
size_t CP::priority_queue<T,Comp>::get_rank(size_t pos) const {
  //write your code here
	int ret = 0;
	for(int i = 0;i < size();i++){
		if(mLess(mData[pos], mData[i])) ret++;
	}
	return ret;
}

#endif
