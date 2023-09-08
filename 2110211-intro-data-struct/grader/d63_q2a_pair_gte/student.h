#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T1,typename T2>
bool CP::pair<T1,T2>::operator>=(const pair<T1,T2>& other) const {
  //write your code here
  if( this->first == other.first && this->second == other.second) return true;
  if((this->first > other.first) || (this->first== other.first && this->second > other.second)) return true;
  return false;
}

#endif
