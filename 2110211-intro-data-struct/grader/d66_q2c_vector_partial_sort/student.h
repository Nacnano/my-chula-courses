#ifndef __STUDENT_H_
#define __STUDENT_H_

//can include anything
#include<vector>
#include<algorithm>

template <typename T>
template <typename CompareT>
void CP::vector<T>::partial_sort(std::vector<iterator> &pos,CompareT  comp) {
  // Write code here
  // you can compare two data A and B of type T by calling comp(A,B)
  // which return true when A is less than B

  std::vector<T> tmp;
  for(auto &it: pos){
        tmp.push_back(*it);
  }
  std::sort(tmp.begin(), tmp.end(), comp);

  std::sort(pos.begin(), pos.end());
  auto it_tmp = tmp.begin();
  for(auto &it: pos){
    *it = *it_tmp;
    it_tmp++;
  }
}

#endif
