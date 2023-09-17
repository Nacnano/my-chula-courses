#ifndef __STUDENT_H_
#define __STUDENT_H_

#include<algorithm>


template <typename T>
void CP::vector<T>::insert_many(CP::vector<std::pair<int,T>> data)
{
    //write your code here
    std::sort(data.begin(), data.end());
    T *tmp = new T[mSize + data.size()];
	auto it = data.begin();
	int idx = 0;
    for(int i = 0; i < mSize + data.size(); i++){
		if(it->first == idx){
			tmp[i] = it->second;
			it++;
		}
		else {
			tmp[i] = mData[idx];
			idx++;
		}
    }
    delete[] mData;
    mData = tmp;
    mSize += data.size();
}

#endif
