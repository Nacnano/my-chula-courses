#ifndef __STUDENT_H__
#define __STUDENT_H__

template <typename T>
std::vector<std::vector<T>> CP::stack<T>::distribute(size_t k) const {
  //write your code here
	std::vector<std::vector<T>> ret;
	int sz = size() / k, more = size() % k, idx = 0;
	for(int i = 0 ;i < k;i++){
		std::vector<T> tmp;
		for(int j = 0;j < (i < more ? sz + 1 : sz);j++){
			tmp.push_back(mData[mSize - 1 - idx++]);
		}
		ret.push_back(tmp);
	}
	return ret;
}
#endif
