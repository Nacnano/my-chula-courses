#include<bits/stdc++.h>
using namespace std;

map<int, bool> has;

int main(){

    int n;
    cin >> n;
    for(int i=0;i<n;i++){
        int a;
        cin >> a;
        if(a<1 || a>n || has.find(a)!=has.end()){
            cout << "NO\n";
            return 0;
        }
        has[a]=true;
    }
    cout << "YES\n";
}
