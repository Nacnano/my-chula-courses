#include <stdexcept>
#include <vector>
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include "list.h"
#include "student.h"
//#pragma once


bool check(CP::list<int> &l,CP::list<int> &check) {
  bool ok = true;
  // report result
  if (check.size() != l.size()) {
    printf("Size is wrong\n");
    ok = false;
  }

  //check "next" pointer
  CP::list<int>::iterator it1,it2;
  it1 = l.begin();
  it2 = check.begin();
  for (size_t i = 0;i < check.size();i++) {
    if (*it1 != *it2) { 
      printf("wrong data\n");
      ok = false;
    }
    it1++; it2++;
  }
  if (it1 != l.end()) {
    printf("wrong end() for l\n");
    ok = false;
  }

  //check "prev" pointer
  it1 = l.end();
  it2 = check.end();
  for (size_t i = 0;i < check.size();i++) {
    it1--; it2--;
    if (*it1 != *it2) { 
      printf("wrong data\n");
      ok = false;
    }
  }
  if (it1 != l.begin()) { 
    printf("wrong begin() for l\n");
    ok = false;
  }
  return ok;
}


int main() {
  std::vector<int> v = {10, 20, 30, 40, 50, 60, 70, 80};
  size_t pos = 4;


  // add value from v to l
	CP::list<int> l1;
  for (auto x : v) l1.push_back(x);


  // create it and pos
  auto it = l1.begin();
  for (size_t i = 0;i < pos;i++) {
    it++;
  }

  //call the split
  CP::list<int> l2;
  l2 = l1.split(it,pos);

  printf("-------- the remaining list ---------\n");
  l1.print();
  printf("-------- the split list ---------\n");
  l2.print();


  // check
  // create the correct result in O(N)
  CP::list<int> check1, check2;
  for (size_t i = 0;i < v.size();i++) {
    if (i < pos) check1.push_back(v[i]);
    if (i >= pos) check2.push_back(v[i]);
  }

  printf("checking l1 (the original list)\n");
  bool b1 = check(l1,check1);
  printf("checking l2 (the returned list)\n");
  bool b2 = check(l2,check2);

  if (b1 && b2) {
    printf("CONCLUSION: correct\n");
  } else {
    printf("CONCLUSION: wrong\n");

  }



	return 0;
}

