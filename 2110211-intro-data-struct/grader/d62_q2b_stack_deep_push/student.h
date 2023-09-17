#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T>
void CP::stack<T>::deep_push(size_t pos,const T& value) {
  //write your code here
	expand(mCap + 1);
	mSize += 1;
	for(int i = mSize - 1;i >= mSize - pos;i--){
		mData[i] = mData[i-1];
	}
	mData[mSize - pos - 1] = value;
}

#endif
