#include <stdexcept>
#include <iostream>
#include "vector.h"
#include "student.h"
#include <vector>

bool test1() {
  CP::vector<int> v(10);
  auto it = v.begin();
  if (!(v.valid_iterator(v.end()) == false)) return false;
  return v.valid_iterator(it) == true;
}

bool test2() {
  CP::vector<int> v;
  auto it = v.begin();
  return v.valid_iterator(it) == false;
}

bool test3() {
  CP::vector<int> v(1), v2(1);
  auto it = v2.begin();
  if (! (v2.valid_iterator(it) == true) ) return false;
  return v.valid_iterator(it) == false;
}

bool test4() {
  CP::vector<int> v;
  v.push_back(10);
  v.push_back(20);
  auto it = v.begin()+1;
  v.push_back(30);
  if (! (v.valid_iterator(v.end()-1) == true) ) return false;
  return v.valid_iterator(it) == false;
}

bool test5() {
  CP::vector<int> v(10);
  v.resize(3);
  auto it = v.begin() + 3;
  if (! (v.valid_iterator(v.begin()) == true) ) return false;
  return v.valid_iterator(it) == false;
}

bool test6() {
  CP::vector<int> v;
  v.push_back(10);
  v.push_back(20);
  if (! (v.valid_iterator(v.begin()+1) == true) ) return false;
  auto it = v.begin() + 1;
  v.pop_back();
  return v.valid_iterator(it) == false;
}

bool test7() {
  CP::vector<int> v;
  v.push_back(10);
  v.push_back(20);
  if (! (v.valid_iterator(v.end()) == false) ) return false;
  auto it = v.begin() + 1;
  v.pop_back();
  v.push_back(30);
  return v.valid_iterator(it) == true;
}

bool test8() {
  CP::vector<int> v(11);
  if (! (v.valid_iterator(v.end()+1) == false) ) return false;
  v.erase(v.begin() + 5);
  auto it = v.end();
  v.insert(v.begin() + 5, 10);
  return v.valid_iterator(it) == true;
}

bool test9() {
  CP::vector<int> v(10);
  auto it = v.end()-1;
  if (! (v.valid_iterator(it) == true) ) return false;
  v.insert(v.begin() + 5, 10);
  return v.valid_iterator(it) == false;
}

bool test10() {
  CP::vector<int> v(10);
  auto it = v.begin();
  if (! (v.valid_iterator(it+v.size()) == false) ) return false;
  v.erase(v.begin());
  return v.valid_iterator(it) == true;
}


int main() {
  int i;
  std::cin >> i;
  switch(i) {
    case 1: std::cout << (test1() ? "OK " : "WRONG" ) << std::endl; break;
    case 2: std::cout << (test2() ? "OK " : "WRONG" ) << std::endl; break;
    case 3: std::cout << (test3() ? "OK " : "WRONG" ) << std::endl; break;
    case 4: std::cout << (test4() ? "OK " : "WRONG" ) << std::endl; break;
    case 5: std::cout << (test5() ? "OK " : "WRONG" ) << std::endl; break;
    case 6: std::cout << (test6() ? "OK " : "WRONG" ) << std::endl; break;
    case 7: std::cout << (test7() ? "OK " : "WRONG" ) << std::endl; break;
    case 8: std::cout << (test8() ? "OK " : "WRONG" ) << std::endl; break;
    case 9: std::cout << (test9() ? "OK " : "WRONG" ) << std::endl; break;
    case 10: std::cout << (test10() ? "OK " : "WRONG" ) << std::endl; break;
  }
}

