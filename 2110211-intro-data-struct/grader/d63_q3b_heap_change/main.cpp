#include <iostream>
#include <vector>
#include "priority_queue.h"
#include "student.h"

int main() {
  std::ios_base::sync_with_stdio(false);std::cin.tie(0);
  int n,pos,value;
  std::cin >> n >> pos >> value;

  //read and create priority_queue
  CP::priority_queue<int> pq;
  for (int i = 0;i < n;i++) {
    int x;
    std::cin >> x;
    pq.push(x);
  }

  //call change value
  pq.change_value(pos,value);

  //display
  std::cout << "Size is = " << pq.size() << std::endl;
  while (pq.empty() == false) {
    std::cout << pq.top() << " ";
    pq.pop();
  }
  std::cout << std::endl;
}



