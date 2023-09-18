#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename T>
bool CP::vector<T>::block_swap(iterator a, iterator b, size_t m) {
  //write your code here
	if(m <= 0) return false;
	if(a < begin() || a + m - 1 >= end() || b < begin() || b + m - 1 >= end()) return false;
	if(std::min(a, b) + m - 1 >= std::max(a, b)) return false;
	while(m--){
		T tmp = *b;
		*b = *a;
		*a = tmp;
		a++, b++;
	}
	return true;
}

#endif
