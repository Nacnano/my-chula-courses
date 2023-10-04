#include <iostream>
#include <string>
#include "queue.h"
#include "student.h"

using std::cin;
using std::cout;

int main() {
  std::ios_base::sync_with_stdio(false);cin.tie(0);

  int n,m;
  cin >> n >> m;
  std::vector<size_t> pos;
  CP::queue<int> q;
  for (int i = 0;i < n;i++) {
    int a;
    cin >> a; q.push(a);
  }
  pos.resize(m);
  for (int i = 0;i < m;i++) {
    cin >> pos[i];
  }
  cout << q.min_element(pos,std::less<int>());

}
