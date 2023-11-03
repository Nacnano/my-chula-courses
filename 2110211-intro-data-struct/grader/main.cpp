#include <stdexcept>
#include <iostream>
#include "map_bst.h"
#include "student.h"
#include <vector>



int main() {
  std::ios_base::sync_with_stdio(false);std::cin.tie(NULL);

  CP::map_bst<int,int> m;
  int n;
  std::cin >> n;
  for (int i = 0;i < n;i++) {
    int x;
    std::cin >> x;
    m[x] = x;
    std::cout << "Leaves = " << m.leaves_count() << std::endl;
  }




}

