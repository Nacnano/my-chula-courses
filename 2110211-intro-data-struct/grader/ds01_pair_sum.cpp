#include<bits/stdc++.h>
using namespace std;

vector<int> v;
bool has[(int)2e6+5];

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    for(int i=0;i<n;i++){
        int a;
        cin >> a;
        v.push_back(a);
    }

    // O(n^2) solution is slow.
    // use data strutures that can search in O(logn) instead
    for(int i=0;i<(int)v.size();i++){
        for(int j=i+1;j<(int)v.size();j++){
            has[v[i]+v[j]]=true;
        }
    }

    while(m--){
        int x;
        cin >> x;
        cout << (has[x] ? "YES\n" : "NO\n");
    }


}
