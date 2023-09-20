#include <iostream>
#include <vector>
#include "queue.h"
#include "student.h"

using namespace std;
int main()
{
    CP::queue<int> q;
    int n, k;
    cin>>n;
    int tmp;
    for (int i = 0; i < n; i++) {
        cin>>tmp;
        q.push(tmp);
    }
    cin>>k;

    vector<CP::queue<int> > qs = q.split_queue(k);
    for (int i = 0; i < k; i++) {
        cout<<"qs["<<i<<"] = ";
        qs[i].print();
        cout<<endl;
    }
    cout<<"q = ";
    q.print();
    cout<<endl;
    return 0;
}
