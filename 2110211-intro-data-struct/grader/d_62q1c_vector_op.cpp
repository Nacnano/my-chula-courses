#include<bits/stdc++.h>
using namespace std;

vector<int> v;

int main(){

    int q;
    cin >> q;
    while(q--){
        string a;
        int b;
        cin >> a;

        if(a == "pb"){
            cin >> b;
            v.push_back(b);
        }
        else if(a == "sa"){
            sort(v.begin(), v.end());
        }
        else if(a == "sd"){
            sort(v.begin(), v.end(), greater<int>());
        }
        else if(a =="r"){
            reverse(v.begin(), v.end());
        }
        else if(a == "d"){
            cin >> b;
            v.erase(v.begin() + b);
        }
    }

    for(auto x: v){
        cout << x << " ";
    }
}
