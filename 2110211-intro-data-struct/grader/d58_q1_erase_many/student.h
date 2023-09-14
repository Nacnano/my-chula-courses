#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T>
void CP::vector<T>::erase_many(const std::vector<int> &pos) {
  //write your code here
  int it = 0, idx = 0, now = 0;
  while(now < mSize - pos.size()){
	if(idx == pos[it] && it < pos.size()){
		idx++;
		it++;
	}
	else{
		mData[now] = mData[idx];
		idx++;
		now++;
	}
  }
  mSize -= pos.size();
}

#endif
