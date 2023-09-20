#include <stdexcept>
#include <iostream>
#include "priority_queue.h"
#include "student.h"
#include <vector>


bool test1() {
  CP::priority_queue<int> a,b;
  std::vector<int> v = {1,5,4,2,-3,9,6};
  for (auto &x : v) {
    a.push(x);
    b.push(x);
  }
  return (a == b && b == a);
}

bool test2() {
  CP::priority_queue<int> a,b;
  std::vector<int> v1 = {1,5,4,2,-3,9,6};
  std::vector<int> v2 = {1,5,4,2,9,6};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v2) { b.push(x); }
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test3() {
  CP::priority_queue<int> a,b;
  std::vector<int> v1 = {1,5,4,2,-3,9,6};
  std::vector<int> v2 = {1,5,4,2,-3,6};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v2) { b.push(x); }
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test4() {
  CP::priority_queue<std::string> a,b;
  std::vector<std::string> v1 = {"A","AA","ABC","A"};
  std::vector<std::string> v2 = {"A","AA","ABC","A"};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v2) { b.push(x); }
  return ( ((a == b) == true)  && ((b == a) == true));
}

bool test5() {
  CP::priority_queue<std::string> a;
  std::vector<std::string> v1 = {"A","AA","ABC","A"};
  for (auto &x : v1) { a.push(x); }
  CP::priority_queue<std::string> b(a);
  CP::priority_queue<std::string> c;
  c = b;
  return
    ( ((a == b) == true)  && ((b == a) == true)) &&
    ( ((a == c) == true)  && ((c == a) == true)) &&
    ( ((b == c) == true)  && ((c == b) == true));
}

typedef bool(*Comparator)(const int &, const int &);

bool c1(const int &a, const int &b) {
  return a < b;
}

bool c2(const int &aa, const int &bb) {
  return (aa< bb) && (aa < bb);
}

bool c3(const int &a, const int &b) {
  return a > b;
}

bool test6() {
  CP::priority_queue<int,Comparator> a(c1);
  CP::priority_queue<int,Comparator> b(c2);
  std::vector<int> v1 = {1,5,4,2,-3,9,6};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v1) { b.push(x); }
  return ( ((a == b) == true)  && ((b == a) == true));
}

bool test7() {
  CP::priority_queue<int,Comparator> a(c1);
  CP::priority_queue<int,Comparator> b(c3);
  std::vector<int> v1 = {1,5,4,2,-3,9,6};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v1) { b.push(x); }
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test8() {
  CP::priority_queue<int,Comparator> a(c1);
  CP::priority_queue<int,Comparator> b(c1);
  return ( ((a == b) == true)  && ((b == a) == true));
}

int main() {
  std::cout << (test1() ? "OK" : "WRONG" ) << std::endl;
  std::cout << (test2() ? "OK" : "WRONG" ) << std::endl;
  std::cout << (test3() ? "OK" : "WRONG" ) << std::endl;
  std::cout << (test4() ? "OK" : "WRONG" ) << std::endl;
  std::cout << (test5() ? "OK" : "WRONG" ) << std::endl;
  std::cout << (test6() ? "OK" : "WRONG" ) << std::endl;
  std::cout << (test7() ? "OK" : "WRONG" ) << std::endl;
  std::cout << (test8() ? "OK" : "WRONG" ) << std::endl;
}

