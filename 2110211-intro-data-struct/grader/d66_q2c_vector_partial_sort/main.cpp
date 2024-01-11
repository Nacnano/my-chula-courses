#include <iostream>
#include <iomanip>
#include <vector>
#include "vector.h"
#include "student.h"

using namespace std;

void read(int n, int m) {
    CP::vector<int> v(n);
    for (int i = 0; i < n; ++i) {
        cin >> v[i];
    }

    std::vector<typename CP::vector<int>::iterator> pos(m);
    for (int i = 0; i < m; ++i) {
      int tmp;
      cin >> tmp;
      pos[i] = v.begin() + tmp;
    }


    // call student function
    v.partial_sort(pos,std::less<int>());

    // write output
    for (auto &x : v)
      cout << x << " ";
    cout << endl;
}

int main () {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n >> m;

    read(n, m);
}
