#include <stdexcept>
#include <iostream>
#include "vector-nm.h"
#include "student.h"


int main() {
    std::ios_base::sync_with_stdio(false);std::cin.tie(0);
    CP::vector_no_move<int> v;

    int n,m;
    std::cin >> n >> m;

    for (int i = 0;i < n;i++) {
      int t,a;
      std::cin >> t >> a;
      if (t == 1) {
        v.push_back(a);
      } else if (t == 2) {
        if (a <= v.size()) {
          std::cerr << a << " CANNOT RESIZE TO SMALLER SIZE!!!";
          return 1;
        }
        v.resize(a);
      } else {
        if (a >= v.size()) {
          std::cerr << a << " INPUT POSITION OUT OF BOUND!!!";
          return 1;
        }
        v[a] = 0;
      }
    }

    //display maximum value
    for (int i= 0;i < m;i++) {
      int sum = 0;
      for (int j = 0;j < v.size();j++) {
        sum += v[j];
      }
      std::cout << sum << "\n";
    }

}
