#include <algorithm>
#include <random>
#include <chrono>
#include <cassert>
#include <string>
#include "priority_queue.h"
#include "student.h"

using std::cout;
using std::cin;
using std::endl;



int main() {
  std::ios_base::sync_with_stdio(false); cin.tie(NULL);

  CP::priority_queue<int> pq;

  int n,k;
  cin >> n >> k;
  while(n--) {
    int x;
    cin >> x;
    pq.push(x);
  }

  std::vector<int> r = pq.at_level(k);
  cout << "size = " << r.size() << endl;
  for (auto &x : r) {
    cout << x << " ";
  }
  cout << endl;

}
