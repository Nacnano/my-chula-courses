#include<bits/stdc++.h>
using namespace std;

vector<int> g[1005];
vector<int> ans;
int used[1005];

void dfs(int u){
    if(used[u]) return;
    used[u] = 1;
    for(auto v: g[u]){
        dfs(v);
    }

    ans.push_back(u);
}

int main(){

    int n;
    cin >> n;
    for(int i=0;i<n;i++){
        int sz;
        cin >> sz;
        while(sz--){
            int v;
            cin >> v;
            g[i].push_back(v);
        }
    }


    for(int i=0;i<n;i++){
        if(used[i]) continue;
        dfs(i);
    }

    for(auto v: ans){
        cout << v << " ";
    }
}
