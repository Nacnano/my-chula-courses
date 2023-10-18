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
void test_input() {
  int round,max_k;
  cin >> round >> max_k;
  while(round--) {
    CP::priority_queue<T,C> pq;
    int n;
    cin >> n;
    T tmp;
    while(n--) {
      cin >> tmp;
      pq.push(tmp);
    }
    assert(pq.size() >= (size_t)max_k);
    for (int i = 1;i <= max_k;i++) {
      cout << pq.get_kth(i) << endl;
    }
  }
}

template <typename T, typename C = std::less<T>>
void test_random() {
  int n,repeat;

  cin >> repeat >> n;

  std::vector<int> v(n);
  for (int i = 0;i < n;i++) v[i] = i;
  unsigned seed = 17;
  shuffle (v.begin(), v.end(), std::default_random_engine(seed));

  CP::priority_queue<T,C> pq;
  for (int i = 0;i < n;i++) {
    pq.push(i);
  }

  assert(pq.size() >= (size_t)3);
  int a,b,c;
  while (repeat--) {
    a = pq.get_kth(1);
    b = pq.get_kth(2);
    c = pq.get_kth(3);
  }
  cout << a << " " << b << " " << c << endl;
}



int main() {
  std::ios_base::sync_with_stdio(false); cin.tie(NULL);

  int type;
  cin >> type;
  switch (type) {
    case 1: test_input<int>(); break;
    case 2: test_input<std::string>(); break;
    case 3: test_input<int,std::greater<int>>(); break;
    case 4: test_random<int>(); break;
    case 5: test_random<int,std::greater<int>>(); break;
  }
}
