#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "vector-sm.h"
#include <algorithm>
#include <iostream>
#include <vector>
#include <cmath>

template <typename T>
void CP::vector_some_move<T>::insert(int index, std::vector<T> &value) {
  // Your code here
	const int bound = (int)sqrt(3500000 + 100000);
	int aux_index = std::upper_bound(aux.begin(), aux.end(), index) - aux.begin();
	if(aux_index > 0){
		index -= aux[aux_index - 1];
	}

	if(aux_index == aux.size()) {
		mData.push_back(value);
	}
	else {
		mData[aux_index].insert(mData[aux_index].begin() + index, value.begin(), value.end());
		if(mData[aux_index].size() > bound){
			mData.insert(mData.begin() + aux_index + 1, std::vector<T>(mData[aux_index].begin() + bound, mData[aux_index].end()));
			mData[aux_index].resize(bound);
		}
	}
	aux.resize(mData.size());

	while(aux_index<mData.size()){
		aux[aux_index] = (aux_index > 0 ? aux[aux_index - 1] : 0) + mData[aux_index].size();
		aux_index++;
	}
	mSize = aux.back();
	mCap = aux.back();
}

#endif
