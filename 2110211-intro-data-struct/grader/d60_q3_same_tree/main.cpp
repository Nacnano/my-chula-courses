#include <iostream>
#include "tree.h"
using namespace std;

int main()
{
    Tree t1;
    Tree t2;
    int n, m, x;
    cin>>n;
    for (int i = 0; i < n; i++) {
        cin>>x;
        t1.insert(x);
    }
    cin>>m;
    for (int i = 0; i < m; i++) {
        cin>>x;
        t2.insert(x);
    }
    if (t1.isSameBinaryTree(t2)) {
        cout<<"True"<<endl;
    } else {
        cout<<"False"<<endl;
    }
    return 0;
}
