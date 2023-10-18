#include <cassert>
#include <vector>
#include <iostream>
#include <string>
#include "list.h"
#include "student.h"

using std::cin;
using std::cout;
using std::string;


int main() {
  std::ios_base::sync_with_stdio(0);
  std::cin.tie(0);

  int n,m;
  cin >> n >> m;

  //read the first list
  CP::list<int> l;
  for (int j = 0;j < n;j++) {
    int tmp;
    cin >> tmp;
    l.push_back(tmp);
  }

  //read m lists
  CP::list<CP::list<int>> ls;
  for (int i = 0;i < m;i++) {
    ls.push_back(CP::list<int>());
    int k;
    cin >> k;
    for (int j = 0;j < k;j++) {
      int tmp;
      cin >> tmp;
      ls.back().push_back(tmp);
    }
  }

  l.merge(ls);
  l.print();
}

