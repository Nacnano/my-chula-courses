#include "priority_queue.h"
#include "student.h"
#include <iostream>

int main() {
  int n;
  std::cin >> n;
  int* mData = new int[n];
  for (int i = 0; i < n; ++i) {
    std::cin >> mData[i];
  }
  CP::priority_queue<int> pq(mData, n, n);
  std::cout << (pq.check() ? "true" : "false") << "\n";
}
