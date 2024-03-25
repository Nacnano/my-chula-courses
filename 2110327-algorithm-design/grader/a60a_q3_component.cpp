#include<bits/stdc++.h>
using namespace std;

vector<int> g[10005];
int used[10005];

void dfs(int u){
    if(used[u]) return;
    used[u] = 1;

    for(auto v : g[u]){
        if(used[v]) continue;
        dfs(v);
    }
}

int main(){

    int n, m;
    cin >> n >> m;
    while(m--){
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }

    int ans = 0;
    for(int i=1;i<=n;i++){
        if(used[i]) continue;
        dfs(i);
        ans++;
    }
    cout << ans;
}
