#include <stdio.h>
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
    if (c == 'a' || c == 'm' || c == 'r') {
      // add data
      int n;
      scanf("%d", &n);
      if (c == 'a') {
        s.push(n);
      } else if (c == 'm') {
        s.multi_pop(n);
      } else if (c == 'r') {
        auto s1 = s.remove_top(n);
        printf("remove_top Result: Size = %d Data =",(int)s.size());
        while (s1.empty() == false) {
          printf(" %d",s1.top()); s1.pop();
        }
        printf("\n");
      }
    } else if (c == 'd') {
       s.pop();
    } else if (c == 'p') {
      s.print();
    }
    scanf("%c", &c);
  }
  return 0;
}
