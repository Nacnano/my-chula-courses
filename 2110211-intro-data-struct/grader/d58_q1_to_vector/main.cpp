#include <iostream>
#include <stack>
#include <assert.h>
#include "queue.h"
#include "student.h"

typedef CP::queue<int> Queue;
using namespace std;


bool test1() {
  Queue q;
  q.push(1);
  q.push(2);
  q.push(3);
  vector<int> v = q.to_vector(2);
  for (auto &x : v) {
    cout << x << " ";
  }
  cout << endl;

  return true;
}


bool test2() {
  vector<int> v = {1, 2, 3, 4, 5};
  Queue q(v.begin() + 1,v.begin() + 4);
  while (!q.empty()) {
    cout << q.front() << " ";
    q.pop();
  }
  cout << endl;
  return true;
}

bool test3() {
  Queue q;
  for (int i = 0;i < 100;i++)
    q.push(100-i);
  vector<int> v = q.to_vector(20);
  for (auto &x : v) {
    cout << x << " ";
  }
  cout << endl;
  return true;
}

bool test4() {
  vector<int> v;
  for (int i = 0;i < 100;i++) v.push_back(i*10);
  Queue q1(v.begin() + 42,v.begin() + 42);
  cout << q1.size() << endl;
  Queue q2(v.begin() + 42,v.begin() + 52);
  cout << q2.size() << endl;
  while (!q2.empty()) {
    cout << q2.front() << " ";
    q2.pop();
  }
  cout << endl;
  return true;
}

bool test5() {
  Queue q;
  for (int i = 0;i < 1000;i++)
    q.push(i*2);
  for (int i = 0;i < 200;i++) q.pop();
  vector<int> v = q.to_vector(200);
  for (auto &x : v) {
    cout << x << " ";
  }
  cout << endl;
  return true;
}
bool test6() {
  Queue q;
  for (int i = 0;i < 1000;i++)
    q.push(i*2);
  for (int i = 0;i < 200;i++) q.pop();
  vector<int> v1 = q.to_vector(200);
  for (int i = 0;i < 1000;i++)
    q.push(i*20);
  for (int i = 0;i < 300;i++) q.pop();
  vector<int> v2 = q.to_vector(1300);
  for (auto &x : v2) {
    cout << x << " ";
  }
  cout << endl;
  return true;
}

bool test7() {
  Queue q;
  for (int i = 0;i < 1000;i++)
    q.push(1000-i);
  vector<int> v = q.to_vector(500);
  Queue q2(v.begin() + 123, v.end());
  while (!q2.empty()) {
    cout << q2.front() << " ";
    q2.pop();
  }
  cout << endl;
  return true;
}

bool test8() {
  vector<int> v;
  for (int i = 0;i < 50000;i++) v.push_back(i*10);
  Queue q1(v.begin() + 4242,v.begin() + 4242);
  cout << q1.size() << endl;
  Queue q2(v.begin() + 4242,v.begin() + 13552);
  cout << q2.size() << endl;
  while (!q2.empty()) {
    cout << q2.front() << " ";
    q2.pop();
  }
  cout << endl;
  return true;
}

bool test9() {
  Queue q;
  for (int i = 0;i < 50000;i++)
    q.push(i*7);
  vector<int> v = q.to_vector(10500);
  for (auto &x : v) {
    cout << x << " ";
  }
  cout << endl;
  return true;
}

bool test10() {
  Queue q;
  for (int i = 0;i < 50000;i++)
    q.push(i*7);
  vector<int> v = q.to_vector(10500);
  Queue q2(v.begin() + 123, v.end());
  while (!q2.empty()) {
    cout << q2.front() << " ";
    q2.pop();
  }
  cout << endl;
  return true;
}

int main() {
  int test_case;
  std::cin >> test_case;
  switch(test_case) {
    case 1: if (test1()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 2: if (test2()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 3: if (test3()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 4: if (test4()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 5: if (test5()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 6: if (test6()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 7: if (test7()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 8: if (test8()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 9: if (test9()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
    case 10: if (test10()) std::cout << "OK 1-10hasdvlj841" << std::endl; break;
  }

  return 0;
}
