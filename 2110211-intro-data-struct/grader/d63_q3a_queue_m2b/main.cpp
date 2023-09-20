#include <iostream>
#include <vector>
#include "queue.h"
#include "student.h"
#include <stdio.h>

using namespace std;

int main() {
  CP::queue<int> q;
  char c;
  scanf("%c", &c);
  while (c != 'q') {
    if (c == 'u') {
      // add data
      int v;
      scanf("%d", &v);
      q.push(v);
    } else if (c == 'o') {
      q.pop();
    } else if (c == 'p') {
      q.print();
    } else if (c == 'm') {
      int p;
      scanf("%d", &p);
      q.move_to_back(p);
    }
    scanf("%c", &c);
  }
  return 0;
}
