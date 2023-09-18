#include <stdexcept>
#include <iostream>
#include "vector.h"
#include "student.h"


int main() {
    std::ios_base::sync_with_stdio(false);std::cin.tie(0);
    CP::vector<int> v;
    int round,n;
    std::cin >> n;
    for (int i = 0;i < n;i++) {
      int x;
      std::cin >> x;
      v.push_back(x);
    }

    int a,b,m;
    std::cin >> a >> b >> m;
    bool result = v.block_swap(v.begin() + a, v.begin() + b,m);
    std::cout << "result is " << result << std::endl;
    std::cout << "Size of v is " << v.size() << std::endl;
    std::cout << "v: ";
    for (auto &x : v) {
      std::cout << x << " ";
    }
    std::cout << std::endl;
}
