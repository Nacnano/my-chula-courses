#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <vector>
#include <stack>
#include "priority_queue.h"
#include "student.h"

using namespace std;

int main() {
  CP::priority_queue<int> pq;
  char c;
  scanf("%c", &c);
  while (c != 'q') {
    if (c == 'a') {
      // add data
      int n;
      scanf("%d", &n);
      pq.push(n);
    } else if (c == 'h') {
      int r = pq.height();
      int n = pq.size();
      printf("Binary Heap with %d nodes has height %d\n",n,r);
    } else if (c == 'd') {
       pq.pop();
    }
    scanf("%c", &c);
  }
  return 0;
}
