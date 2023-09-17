#ifndef __STUDENT_H_
#define __STUDENT_H_


template <typename T>
void CP::vector<T>::insert(iterator position,iterator first,iterator last)
{
    //write your code here
    int newCap = mCap + last - first, pos = position - begin();
    expand(mCap + last - first);
    mSize += last - first;

    for(int i = newCap - 1; i >= pos + (last - first); i--){
        mData[i] = mData [i - (last -first)];
    }
    auto it = first;
    for(auto it = first; it < last;it++){
        mData[pos + (it - first)] = *it;
    }
}

#endif
