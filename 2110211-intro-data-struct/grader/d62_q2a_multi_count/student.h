#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <map>

template <typename T>
std::vector<std::pair<T,size_t>> CP::queue<T>::count_multi(std::vector<T> &k) const {
    //write your code here
    std::map<T, int> mm;
    for(int i = 0;i < size();i++){
		mm[mData[(i + mFront) % mCap]] += 1;
    }

    std::vector<std::pair<T, size_t> > ret;
    for(auto &x: k){
		ret.push_back({x, mm[x]});
	}
	return ret;
}

#endif
