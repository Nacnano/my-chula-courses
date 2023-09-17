#include <stdexcept>
#include <iostream>
#include "vector.h"
#include "student.h"
#include <vector>

bool test1() {
  CP::vector<int> v(10);
  CP::vector<int> w(3);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}

bool test2() {
  CP::vector<int> v;
  CP::vector<int> w;
  v.push_back(1); v.push_back(2); v.push_back(3);
  w.push_back(10); w.push_back(4);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}


bool test3() {
  CP::vector<int> v(10);
  CP::vector<int> w(3);
  v.push_back(1); v.push_back(2); v.push_back(3);
  v.erase(v.begin());
  w.push_back(10); w.push_back(4);
  w.erase(w.end()-1);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}

bool test4() {
  CP::vector<int> v(10);
  CP::vector<int> w(3);
  int n1 = 500000;
  int n2 = 200000;
  for (int i = 0;i < n1;i++) v.push_back(i);
  for (int i = 0;i < n2;i++) w.push_back(-i*2);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}

bool test5() {
  CP::vector<int> v;
  CP::vector<int> w;
  int n1 = 500000;
  int n2 = 200000;
  for (int i = 0;i < n1;i++) v.push_back(i);
  for (int i = 0;i < n2;i++) w.push_back(-i*2);
  v.erase(v.begin());
  v.erase(v.begin()+10);
  w.erase(w.begin());
  w.erase(w.begin()+100);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}

bool test6() {
  CP::vector<int> v(10);
  CP::vector<int> w(3);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  for (int i = 0;i < 100001;i++)
    v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}

bool test7() {
  CP::vector<int> v;
  CP::vector<int> w;
  v.push_back(1); v.push_back(2); v.push_back(3);
  w.push_back(10); w.push_back(4);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  for (int i = 0;i < 100001;i++)
    v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}


bool test8() {
  CP::vector<int> v(10);
  CP::vector<int> w(3);
  v.push_back(1); v.push_back(2); v.push_back(3);
  v.erase(v.begin());
  w.push_back(10); w.push_back(4);
  w.erase(w.end()-1);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  for (int i = 0;i < 100001;i++)
    v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}

bool test9() {
  CP::vector<int> v(10);
  CP::vector<int> w(3);
  int n1 = 500000;
  int n2 = 200000;
  for (int i = 0;i < n1;i++) v.push_back(i);
  for (int i = 0;i < n2;i++) w.push_back(-i*2);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  for (int i = 0;i < 100001;i++)
    v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}

bool test10() {
  CP::vector<int> v;
  CP::vector<int> w;
  int n1 = 500000;
  int n2 = 200000;
  for (int i = 0;i < n1;i++) v.push_back(i);
  for (int i = 0;i < n2;i++) w.push_back(-i*2);
  v.erase(v.begin());
  v.erase(v.begin()+10);
  w.erase(w.begin());
  w.erase(w.begin()+100);

  CP::vector<int> v2(v);
  CP::vector<int> w2(w);
  for (int i = 0;i < 100001;i++)
    v.swap(w);
  if (v == w2 && w == v2) return true;
  return false;
}


int main() {
  int i;
  std::cin >> i;
  switch(i) {
    case 1: std::cout << (test1()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 2: std::cout << (test2()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 3: std::cout << (test3()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 4: std::cout << (test4()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 5: std::cout << (test5()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 6: std::cout << (test6()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 7: std::cout << (test7()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 8: std::cout << (test8()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 9: std::cout << (test9()   ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
    case 10: std::cout << (test10() ? "OK aw38kraw7u8t0awe2p23" : "WRONG" ) << std::endl; break;
  }
}

