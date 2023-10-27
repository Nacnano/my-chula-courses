#include <stdexcept>
#include <vector>
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include "list.h"
#include "student.h"
//#pragma once



int main() {
  CP::list<int> l;
  int n,k;
  std::cin >> n >> k;
  while (n--) {
    int x;
    std::cin >> x;
    l.push_back(x);
  }
  l.remove_all(k);
  l.print();
}

