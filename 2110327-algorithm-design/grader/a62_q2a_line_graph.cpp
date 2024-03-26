#include<bits/stdc++.h>
using namespace std;
const int maxN=1e5+5;

bool visited[maxN];
vector<int> g[maxN];

bool dfs(int u, int prev){
    if(visited[u]){
        return false;
    }
    visited[u] = true;
    if(g[u].size() == 0){
        return true;
    }
    if(g[u].size() == 1 && visited[g[u][0]]){
        return true;
    }

    bool ret = true;
    for(auto v: g[u]){
        if(v == prev) continue;
        if(!dfs(v, u) || g[v].size() > 2) ret = false;
    }
    return ret && g[u].size() <= 2;
}

int main(){

    int n, m;
    cin >> n >> m;
    while(m--){
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
        g[b].push_back(a);
    }

    int ans=0;
    for(int i=0;i<n;i++){
        if(!visited[i]){
            ans += dfs(i, -1);
        }
    }
    cout << ans;
}
