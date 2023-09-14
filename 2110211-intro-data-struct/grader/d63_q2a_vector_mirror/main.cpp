#include <stdexcept>
#include <iostream>
#include "vector.h"
#include "student.h"


int main() {
    std::ios_base::sync_with_stdio(false);std::cin.tie(0);
    CP::vector<int> v;
    int n;
    std::cin >> n;
    for (int i = 0;i < n;i++) {
        int a;
        std::cin >> a;
        v.push_back(a);
    }

    v.mirror();

    std::cout << "Size of v is " << v.size() << std::endl;
    for (auto &x : v) {
        std::cout << x << " ";
    }
    std::cout << std::endl;


}
