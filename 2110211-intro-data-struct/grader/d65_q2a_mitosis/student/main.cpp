#include "student.h"
#include <iostream>
#include <vector>

int main()
{
    int n, t;
    std::cin >> n >> t;
    CP::stack<int> s;
    for (int i = 0; i < n; ++i)
    {
        int tmp;
        std::cin >> tmp;
        s.push(tmp);
    }
    for (int i = 0; i < t; ++i)
    {
        int a, b;
        std::cin >> a >> b;
        s.mitosis(a, b);
    }
    std::vector<int> v(s.size());
    int idx = v.size();
    while (!s.empty())
    {
        v[--idx] = s.top();
        s.pop();
    }
    for (auto &x : v)
    {
        std::cout << x << " ";
    }
    std::cout << "\n";
}