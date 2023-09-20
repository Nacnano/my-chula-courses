#include "student.h"
#include "vector-sm.h"
#include <iostream>
#include <vector>
using std::cin;
using std::cout;
using std::endl;

int main() {
  CP::vector_some_move<int> v;
  int n, m, pos; // n   - Amount of time to be resized
                 // m   - Amount of element to be inserted
                 // pos - postion of the vector to insert to
  cin >> n >> m >> pos;
  for (int i = 0; i < n; ++i) {
    int sz;
    cin >> sz;
    v.resize(v.size() + sz); // Expand v with sz more element
  }
  for (int i = 0; i < v.size(); ++i) {
    cin >> v[i]; // Each element of the vector_some_move (v)
  }
  std::vector<int> to_be_insert(m); // The values to be inserted
  for (int i = 0; i < m; ++i) {
    cin >> to_be_insert[i];
  }
  cout << "--- BEFORE INSERT ---" << endl;
  for (int i = 0; i < v.size(); ++i) {
    cout << v[i] << " ";
  }
  cout << endl;
  v.insert(pos, to_be_insert); // Inserting values
  cout << "--- AFTER INSERT ---" << endl;
  for (int i = 0; i < v.size(); ++i) {
    cout << v[i] << " ";
  }
  cout << endl;
}
