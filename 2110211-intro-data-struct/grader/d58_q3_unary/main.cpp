#include <vector>
#include <iostream>
#include "map_bst.h"
#include "student.h"

using namespace std;


int main() {
  int n;
  cin >> n;
  CP::map_bst<int,int> m;
  while(n--) {
    int a;
    cin >> a;
    m[a] = a;
    cout << "Size = " << m.size() << " unary_count = " << m.count_unary() << endl;
  }

}
