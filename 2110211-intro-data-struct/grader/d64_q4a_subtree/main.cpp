#include <iostream>
#include "map_bst.h"
#include "student.h"
#include <set>

std::set<int> destroyed;


int main() {
  std::ios_base::sync_with_stdio(false);std::cin.tie(nullptr);
  int n;
  CP::map_bst<int,int> m,left,right;
  std::cin >> n;
  int k;
  for (int i = 0;i < n;i++) {
    std::cin >> k;
    m[k] = i;
  }
  auto t = m.subtree(left,right);
  std::cout << "return: " << t.first << ":" << t.second << "\n";
  std::cout << "main tree:  "; m.print();
  std::cout << "left tree:  "; left.print();
  std::cout << "right tree: "; right.print();
}
