#include <iostream>
#include <vector>

using namespace std;

#include "song.h"

int main() {
  int n;
  cin >> n;
  for (int i = 0;i < n;i++) {
    string title,artist;
    int count;
    cin >> title >> artist >> count;
    Song s(title,artist,count);
    pq1.push(s);
    pq2.push(s);
  }

  cout << "--- Order By Artist-Title-count ---" << endl;
  while (pq1.empty() == false) {
    cout << pq1.top() << endl;
    pq1.pop();
  }

  cout << "--- Order By count-Artist-Title ---" << endl;
  while (pq2.empty() == false) {
    cout << pq2.top() << endl;
    pq2.pop();
  }
}

