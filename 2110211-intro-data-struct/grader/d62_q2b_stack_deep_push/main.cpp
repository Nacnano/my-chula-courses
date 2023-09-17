#include <iostream>
#include <vector>
#include <stack>
#include "stack.h"
#include "student.h"

using namespace std;



int main() {
  CP::stack<int> s;
  char c;
  scanf("%c", &c);
  while (c != 'q') {
    if (c == 'u') {
      // add data
      int v;
      scanf("%d", &v);
      s.push(v);
    } else if (c == 'o') {
       s.pop();
    } else if (c == 'p') {
      s.print();
    } else if (c == 'd') {
      int p,v;
      scanf("%d %d", &p, &v);
      s.deep_push(p,v);
    }
    scanf("%c", &c);
  }
  return 0;
}
