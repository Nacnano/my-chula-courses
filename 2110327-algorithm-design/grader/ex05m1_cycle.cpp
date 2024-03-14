#include<bits/stdc++.h>
using namespace std;

int has=0;
bool visited[1005];
vector<int> g[1005];


void dfs(int u, int prev){
    if(visited[u]) {
        has = 1;
        return;
    }

    visited[u] = 1;
    for(auto v: g[u]){
        if(v == prev) continue;
        dfs(v, u);
    }
}


void solve(){
    int n, m;
    cin >> n >> m;
    for(int i=0;i<n;i++) {
        visited[i] = 0;
        g[i].clear();
    }

    while(m--){
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
        g[b].push_back(a);
    }

    has = 0;
    for(int i=0;i<n;i++){
        if(visited[i] == 0) dfs(i, -1);
    }
    cout << (has ? "YES" : "NO") << "\n";
}

int main(){

    int t;
    cin >> t;
    while(t--){
        solve();
    }
}
