#include <stdio.h>
#include <stdlib.h>
#include <algorithm>
#include <functional>
#include <iostream>
#include "priority_queue.h"
#include "student.h"

//---------------------------------------------
int main(int argc, char *argv[]) {

  char c = 0;
  CP::priority_queue<int> h;
  scanf("%c", &c);
  int v;
  while (c != 'q') {
    if (c == 'i') {
      // insert
      scanf("%d", &v);
      h.push(v);
    } else
    if (c == 'x') {
      // remove min
      h.pop();
    }
    scanf("%c", &c);
  }

  //check
  h.print_and_check();
  while (h.empty() == false) {
    int d = h.top();
    std::cout << d << " ";
    h.pop();
  }
  std::cout << std::endl;
  return 0;
}
