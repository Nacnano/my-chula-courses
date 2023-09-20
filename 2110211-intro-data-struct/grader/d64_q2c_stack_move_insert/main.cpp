#include <iostream>
#include <vector>
#include "stack.h"
#include "student.h"

using namespace std;

int main() {
  ios_base::sync_with_stdio(false);cin.tie(0);

  int a,b,k,m;
  int tmp;
  CP::stack<int> s1,s2;
  cin >> a >> b >> k >> m;
  for (int i = 0;i < a;i++) {
    cin >> tmp;
    s1.push(tmp);
  }
  for (int i = 0;i < b;i++) {
    cin >> tmp;
    s2.push(tmp);
  }
  s1.moveInsert(k,s2,m);

  cout << "s1 size = " << s1.size() << endl;
  while (!s1.empty()) {
    cout << s1.top() << " ";
    s1.pop();
  }
  cout << endl;
  cout << "s2 size = " << s2.size() << endl;
  while (!s2.empty()) {
    cout << s2.top() << " ";
    s2.pop();
  }
  cout << endl;
}

