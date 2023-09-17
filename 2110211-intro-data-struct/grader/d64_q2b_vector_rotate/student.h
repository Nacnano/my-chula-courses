#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T>
void CP::vector<T>::rotate(iterator first, iterator last, size_t k) {
  //write your code here
	int sz = last - first, st = first - begin();
	T tmp[k];
	for(int i = 0;i < k;i++){
		tmp[i] = mData[st + i];
	}
	for(int i = st; i < st + sz - k;i++){
		mData[i] = mData[i + k];
	}
	for(int i = 0; i < k;i++){
		mData[i + sz - k + st] = tmp[i];
	}
}

#endif
