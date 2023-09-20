#include <stdexcept>
#include <iostream>
#include "queue.h"
#include "student.h"
#include <vector>

#include <time.h>
#include <stdlib.h>

template <typename T>
void print(std::vector<std::pair<T,size_t>> &result) {
  for (auto &x : result) {
    std::cout << x.first << " " << x.second << std::endl;
  }
}

int neg(){
    return (rand()%2)?1:-1;
}

// Blank k
bool test1() {
  std::vector<int> k;
  CP::queue<int> q;
  q.push(3);
  q.push(-9);
  q.push(1000);
  q.push(5001);
  q.push(404);
  q.push(99);
  auto r = q.count_multi(k);
  print(r);
  return true;
}

// Blank q
bool test2() {
  std::vector<int> k;
  CP::queue<int> q;
  k.push_back(3);
  k.push_back(-9);
  k.push_back(1000);
  k.push_back(5001);
  k.push_back(404);
  k.push_back(99);

  auto r = q.count_multi(k);
  print(r);
  return true;
}

// Exists and not Exists
bool test3() {
  std::vector<int> k;
  CP::queue<int> q;
  q.push(50);
  q.push(50);
  q.push(10);
  q.push(1);
    for (int i=0;i<=11;i++) q.push(-99);
    for (int i=0;i<=15;i++) q.push(5001);
    for (int i=0;i<=1000;i++) q.push(1000000000);
  q.push(404);
  q.push(99);
  k.push_back(-2);
  k.push_back(404);
  k.push_back(50);
  k.push_back(1000000000);
  k.push_back(11111);
  k.push_back(-99);
  auto r = q.count_multi(k);
  print(r);
  return true;
}

// 2000 elements, random valid in k
bool test4() {

  std::vector<int> k;
  CP::queue<int> q;
    for (int i=0;i<2000;i++){
        int rndx = neg()*rand();
        q.push(rndx);
        if ((rand()%50) == 0) k.push_back(rndx);
        else if (rand()%2) k.push_back(neg()*rand());
    }
  auto r = q.count_multi(k);
  print(r);
  return true;
}

// All not existed in k
bool test5() {
  std::vector<int> k;
  CP::queue<int> q;
    q.push(50);
  q.push(50);
  q.push(-10);
  q.push(1);
    for (int i=0;i<=11;i++) q.push(-99);
    for (int i=0;i<=15;i++) q.push(5001);
  q.push(404);
  q.push(99);
  k.push_back(-55552);
  k.push_back(5066);
  k.push_back(11111);
  k.push_back(-999);
  auto r = q.count_multi(k);
  print(r);
  return true;
}

// |k|, |q| = 2000 and same
bool test6() {
  std::vector<int> k;
  CP::queue<int> q;

  int rndx = rand();
    for (int i=0;i<2000;i++){
        k.push_back(rndx);
        q.push(rndx);
    }
  auto r = q.count_multi(k);
  print(r);
  return true;
}

// |k|, |q| = 2000 and not same
bool test7() {
  std::vector<int> k;
  CP::queue<int> q;

    int rndx, rndy;
    for (int i=0;i<2000;i++){
        rndx = rand();
        rndy = rand();
        k.push_back(rndx);
        q.push(rndy);
    }
  auto r = q.count_multi(k);
  print(r);
  return true;
}

// Multiple Multi-value with int 1e9
bool test8() {
  std::vector<int> k;
  CP::queue<int> q;
  for (int i=0;i<2000;i++){
    if (rand()%4) q.push(1000000000);
    else q.push(rand());
    if (rand()%2){
        if ((rand()%100)==0){
            k.push_back(1000000000);
        }else{
            k.push_back(rand());
        }
    }
  }
  auto r = q.count_multi(k);
  print(r);
  return true;
}

// Multiple Multi-value with -1e9
bool test9() {
  std::vector<int> k;
  CP::queue<int> q;

  for (int i=0;i<2000;i++){
    if (rand()%4) q.push(-1000000000);
    else q.push(neg()*rand());
    if (rand()%2){
        if ((rand()%100)==0){
            k.push_back(-1000000000);
        }else{
            k.push_back(neg()*rand());
        }
    }
  }

  auto r = q.count_multi(k);
  print(r);
  return true;
}

// Test Multi-value
bool test10() {
  std::vector<int> k;
  CP::queue<int> q;

  int x, tmp = 0;
  for (int i=0;i<2000;i++){

    x = rand();
    k.push_back(neg()*x);
    if ((rand()%3) == 0 && q.size()>0){
        x = tmp;
    }
    if ((rand()%10)==0) tmp = x;
    q.push(neg()*x);
  }

  auto r = q.count_multi(k);
  print(r);
  return true;
}



int main() {
    srand(1453);
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

