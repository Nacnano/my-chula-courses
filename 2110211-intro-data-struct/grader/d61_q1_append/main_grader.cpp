#include <iostream>
#include <fstream>
#include <stdio.h>
#include <stdlib.h>
#include "student.h"
using namespace std;
int main() {
    /*
    for (int c = 0; c < 16; c++) {
        char fname[100];
        sprintf(fname,"%d.in",(c+1));
        ofstream of(fname);
        int n = 4 << (((c % 4) + 1)*4);
        int m = 3 << (((c % 4) + 1)*4);
        if (n > 100000) n = 100000;
        if (m > 100000) m = 100000;

        cout<<n<<" "<<m<<endl;
        of<<(c / 4)<<endl;
        of<<n<<endl;
        of<<m<<endl;
        for (int i = 0; i < n; i++) of<<rand()<<" "; of<<endl;
        for (int i = 0; i < m; i++) of<<rand()<<" "; of<<endl;

        of.close();
    }
    */
    int c, n, m;
    cin>>c;
    cin>>n;
    cin>>m;

    CP::stack<int> S1;
    CP::stack<int> S2;
    CP::queue<int> Q1;
    CP::queue<int> Q2;
    int t;
    if (c == 0) {
        // Stack, Stack
        for (int i = 0; i < n; i++) {
          cin>>t;
          S1.push(t);
        }
        for (int i = 0; i < m; i++) {
          cin>>t;
          S2.push(t);
        }
        S1.appendStack(S2);
        S1.print();
    } else
    if (c == 1) {
        // Stack, Queue
        for (int i = 0; i < n; i++) {
          cin>>t;
          S1.push(t);
        }
        for (int i = 0; i < m; i++) {
          cin>>t;
          Q2.push(t);
        }
        S1.appendQueue(Q2);
        S1.print();
    } else
    if (c == 2) {
        // Queue, Stack
        for (int i = 0; i < n; i++) {
          cin>>t;
          Q1.push(t);
        }
        for (int i = 0; i < m; i++) {
          cin>>t;
          S2.push(t);
        }
        Q1.appendStack(S2);
        Q1.print();
    } else
    if (c == 3) {
        // Queue, Queue
        for (int i = 0; i < n; i++) {
          cin>>t;
          Q1.push(t);
        }
        for (int i = 0; i < m; i++) {
          cin>>t;
          Q2.push(t);
        }
        Q1.appendQueue(Q2);
        Q1.print();
    }
    return 0;
}
