
#include <iostream>
#include "list.h"
#include <fstream>
#include <vector>
#include <string>
#include <cstdlib>
#include <cstdio>
using namespace std;

int main()
{
    map<CP::list<int>::node*, int> m;
    CP::list<int> x, a, b;
    int nx, na, nb;
    cin>>nx>>na>>nb;
    int tmp;
    for (int i = 0; i < nx; i++) {
        cin>>tmp;
        x.push_back(tmp);
    }
    for (int i = 0; i < na; i++) {
        cin>>tmp;
        a.push_back(tmp);
    }

    for (int i = 0; i < nb; i++) {
        cin>>tmp;
        b.push_back(tmp);
    }

    x.appendMap(m);
    a.appendMap(m);
    b.appendMap(m);
    x.splitList(a, b);
    cout<<"x is"<<endl;
    x.print();
    cout<<"a is"<<endl;
    a.print();
    cout<<"b is"<<endl;
    b.print();
    if (x.checkInMap((m))) cout<<"daso23324"<<endl;
    if (a.checkInMap((m))) cout<<"3kj23a"<<endl;
    if (b.checkInMap((m))) cout<<"zz3kj23a"<<endl;
    return 0;
}
