#include <stdio.h>
#include <stdlib.h>
#include <stdexcept>
#include <iostream>
#include "queue.h"
#include "student.h"
#include <vector>


bool test1() {
  CP::queue<int> a,b;
  std::vector<int> v = {1,5,4,2,-3,9,6};
  for (auto &x : v) {
    a.push(x);
    b.push(x);
  }
  return (a == b && b == a);
}

bool test2() {
  CP::queue<int> a,b;
  std::vector<int> v1 = {2,3,4,9,1,1,5,4,2,9,6};
  std::vector<int> v2 = {-1,4,5,6,7,1,5,4,2,9,6};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v2) { b.push(x); }
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test3() {
  CP::queue<int> a,b;
  std::vector<int> v1 = {1,5,4,2,-3,9,6};
  std::vector<int> v2 = {1,5,4,2,-3,9,10000};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v2) { b.push(x); }
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test4() {
  CP::queue<std::string> a,b;
  std::vector<std::string> v1 = {"A","AA","ABC"};
  std::vector<std::string> v2 = {"A","AA","ABC","A"};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v2) { b.push(x); }
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test5() {
  CP::queue<std::string> a;
  std::vector<std::string> v1 = {"A","AA","ABC","A"};
  for (auto &x : v1) { a.push(x); }
  CP::queue<std::string> b(a);
  CP::queue<std::string> c;
  c = b;
  return
    ( ((a == b) == true)  && ((b == a) == true)) &&
    ( ((a == c) == true)  && ((c == a) == true)) &&
    ( ((b == c) == true)  && ((c == b) == true));
}


bool test6() {
  CP::queue<int> a,b;
  std::vector<int> v1 = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,4,2,-3,9,6};
  std::vector<int> v2 = {0,0,1,5,4,2,-3,9,6};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v2) { b.push(x); }
  while (a.front() == 0) a.pop();
  while (b.front() == 0) b.pop();
  return ( (a == b)   && (b == a) );
}

bool test7() {
  CP::queue<int> a,b;
  std::vector<int> v1 = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,4,2,-3,9,6,999,999,999};
  std::vector<int> v2 = {0,0,1,5,4,2,-3,9,6,1,1,1};
  for (auto &x : v1) { a.push(x); }
  for (auto &x : v2) { b.push(x); }
  while (a.front() == 0) a.pop();
  while (b.front() == 0) b.pop();
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test8() {
  srand(0);
  CP::queue<int> a,b;
  int f1 = 200;
  int f2 = 10;
  int same = 900;
  int b1 = 100;
  int b2 = 10;
  for (int i = 0;i < f1;i++) a.push(rand());
  for (int i = 0;i < f2;i++) b.push(rand());
  for (int i = 0;i < same;i++) {
    int c = rand();
    a.push(c);
    b.push(c);
  }
  for (int i = 0;i < b1;i++) a.push(rand());
  for (int i = 0;i < b2;i++) b.push(rand());
  for (int i = 0;i < f1;i++) a.pop();
  for (int i = 0;i < f2;i++) b.pop();
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test9() {
  srand(0);
  CP::queue<int> a,b;
  int f1 = 100;
  int f2 = 500;
  int same = 9000;
  int b1 = 10;
  int b2 = 100;
  for (int i = 0;i < f1;i++) a.push(rand());
  for (int i = 0;i < f2;i++) b.push(rand());
  for (int i = 0;i < same;i++) {
    int c = rand();
    a.push(c);
    b.push(c);
  }
  for (int i = 0;i < f1;i++) a.pop();
  for (int i = 0;i < f2;i++) b.pop();
  for (int i = 0;i < b1;i++) a.push(rand());
  for (int i = 0;i < b2;i++) b.push(rand());
  return ( ((a == b) == false)  && ((b == a) == false));
}

bool test10() {
  srand(0);
  CP::queue<int> a,b;
  int f1 = 200;
  int f2 = 10;
  int same = 9000;
  for (int i = 0;i < f1;i++) a.push(rand());
  for (int i = 0;i < f2;i++) b.push(rand());
  for (int i = 0;i < same;i++) {
    int c = rand();
    a.push(c);
    b.push(c);
  }
  for (int i = 0;i < f1;i++) a.pop();
  for (int i = 0;i < f2;i++) b.pop();
  return ( ((a == b))  && ((b == a)));
}
int main() {
  int i;
  std::cin >> i;
  switch(i) {
    case 1: std::cout << (test1() ? "OK" : "WRONG" ) << std::endl; break;
    case 2: std::cout << (test2() ? "OK" : "WRONG" ) << std::endl; break;
    case 3: std::cout << (test3() ? "OK" : "WRONG" ) << std::endl; break;
    case 4: std::cout << (test4() ? "OK" : "WRONG" ) << std::endl; break;
    case 5: std::cout << (test5() ? "OK" : "WRONG" ) << std::endl; break;
    case 6: std::cout << (test6() ? "OK" : "WRONG" ) << std::endl; break;
    case 7: std::cout << (test7() ? "OK" : "WRONG" ) << std::endl; break;
    case 8: std::cout << (test8() ? "OK" : "WRONG" ) << std::endl; break;
    case 9: std::cout << (test9() ? "OK " : "WRONG" ) << std::endl; break;
    case 10: std::cout << (test10() ? "OK" : "WRONG" ) << std::endl; break;
  }
}

