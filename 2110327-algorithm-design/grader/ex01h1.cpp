#include<bits/stdc++.h>
using namespace std;

vector<int> pos;

int main(){
    int n;
    cin >> n;

    pos.push_back(0);
    pos.push_back(1);
    pos.push_back(3);
    for(int i=3;pos.back()<=2e9;i++){
        auto it = lower_bound(pos.begin(), pos.end(), i);
        pos.push_back(pos.back() + it - pos.begin());
    }

    while(n--){
        int x;
        cin >> x;
        cout << lower_bound(pos.begin(), pos.end(), x) - pos.begin() << "\n";
    }
}
