#include <stdexcept>
#include <iostream>
#include "map_bst.h"
#include "student.h"
#include <vector>

using std::cin;
using std::cout;
using std::endl;

int main() {
  std::ios_base::sync_with_stdio(false);std::cin.tie(NULL);

  CP::map_bst<int,bool> m;
  int n,k;
  cin >> n;
  int data;
  while (n--) {
    cin >> data;
    m[data] = true;
  }
  cin >> k;
  while (k--) {
    size_t level;
    cin >> level;
    std::vector<int> result = m.at_level(level);
    cout << "level " << level << " size = " << result.size() << ": ";
    for (auto &x : result) cout << x << " ";
    cout << "\n";
  }

}

