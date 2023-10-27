#include <iostream>
#include <assert.h>
#include "list.h"
#include <string>
using namespace std;


int main() {
  int n,k;
  CP::list<int> l;


  std::cin >> n;
  while (n--) {
    int a;
    std::cin >> a;
    l.push_back(a);
  }
  std::cin >> k;

  l.shift(k);

  //check result
  l.check();
  auto it = l.begin();
  while (it != l.end()) {
    std::cout << *it << " ";
    it++;
  }
  std::cout << std::endl;
  it = l.end(); it--;
  while (it != l.end()) {
    std::cout << *it << " ";
    it--;
  }
  std::cout << std::endl;

	return 0;
}
