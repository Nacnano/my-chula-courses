#include<bits/stdc++.h>
using namespace std;
const int maxK = 2e5+5;

int event[maxK], label[maxK];

int main(){

    int n, m, k;
    cin >> n >> m >> k;
    for(int i=0;i<k;i++){
        int d, e, l;
        cin >> d >> e >> l;
        event[d] = e;
        label[d] = l;
    }

    queue<int> wait, has;
    for(int i=1;i<=k;i++){
        if(event[i] == 0){
            if(wait.empty()) {
                has.push(label[i]);
                cout << "0\n";
                continue;
            }

            cout << wait.front() << "\n";
            wait.pop();
        }
        else {
            if(has.empty()) {
                wait.push(label[i]);
                cout << "0\n";
                continue;
            }
            cout << has.front() << "\n";
            has.pop();
        }
    }

}
