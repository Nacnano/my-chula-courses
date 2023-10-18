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


template <typename T, typename C = std::less<T>>
void test(C less = C()) {
  int n,m;

  cin >> n >> m;

  CP::priority_queue<T,C> pq(less);
  for (int i = 0;i < n;i++) {
    T x;
    cin >> x;
    pq.push(x);
  }

  for (int i = 0;i < m;i++) {
    int x;
    cin >> x;
    std::vector<T> r = pq.at_level(x);
    cout << "result size = " << r.size() << ": ";
    for (auto &x : r) {
      cout << x << " ";
    }
    cout << "\n";
  }
}


class MyComp {
  protected:
    int factor;
  public:
    MyComp() : factor(1) {}
    MyComp(int factor) : factor(factor) {}
    bool operator()(const int &lhs,  const int &rhs) const {
      return lhs*factor < rhs*factor;
    }
};



int main() {
  std::ios_base::sync_with_stdio(false); cin.tie(NULL);

  int type;
  cin >> type;
  switch (type) {
    case 0: test<int>(); break;
    case 1: test<std::string>(); break;
    case 2: test<int,std::greater<int>>(); break;
    case 3: test<int,MyComp>(MyComp(-1)); break;
  }
}
