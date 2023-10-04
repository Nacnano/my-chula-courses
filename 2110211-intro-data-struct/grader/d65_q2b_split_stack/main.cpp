#include <iostream>
#include <vector>
#include <algorithm>
#include "student.h"

int main()
{
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    int n, m;
    std::cin >> n >> m;
    CP::stack<int> st;
    for (int i = 0;i < n;i++) {
      int tmp;
      std::cin >> tmp;
      st.push(tmp);
    }
    for (int i = 0;i < m;i++) {
      int k;
      std::cin >> k;
      std::vector<std::vector<int>> res = st.split_stack(k);
      for (int i = 0;i < k;i++) {
        std::cout << "vector " << i << "(" << res[i].size() << "): ";
        for (auto &x : res[i]) {
          std::cout << x << " ";
        }
        std::cout << std::endl;
      }
    }
}
