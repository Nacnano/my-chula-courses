#include <stdexcept>
#include <assert.h>
#include <vector>
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include "list.h"
#include "student.h"

CP::list<int>::iterator move_to(CP::list<int>::iterator a,int oldp, int newp) {
    while (oldp < newp) {
      oldp++;
      a++;
    }
    while (oldp > newp) {
      oldp--;
      a--;
    }
    return a;
}

int main() {
  std::ios_base::sync_with_stdio(0);
  CP::list<int> l;
  int ai, bi;
  ai = bi = -1;
  CP::list<int>::iterator a,b;
  std::string s;
  std::cin >> s;
  while (s != "q") {
    if (s == "i") {
        int v;
        std::cin >> v;
        for (int i = 1;i <= v;i++)
          l.push_back(i*10);
    } else if (s == "u") {
        int v;
        std::cin >> v;
        l.push_back(v);
    } else if (s == "r") {
        int na,nb;
        std::cin >> na >> nb;
        a = (ai == -1) ? move_to(l.begin(),0,na) : move_to(a,ai,na);
        b = (bi == -1) ? move_to(l.begin(),0,nb) : move_to(b,bi,nb);
        ai = na;
        bi = nb;
        a = l.reverse(a,b);
        std::cout << "the returned iterator points to " << *a << std::endl;
    } else if (s == "p") {
        l.print();
    }
    std::cin >> s;
  }
}

