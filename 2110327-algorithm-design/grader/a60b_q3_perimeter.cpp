#include<bits/stdc++.h>
using namespace std;

vector<int> g[1005];
int used[1005];
queue<pair<int, int> > q;

int main(){

    int n, m, k;
    cin >> n >> m >> k;
    while(m--){
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }

    q.push({0, 0});
    int ans = 0;
    while(!q.empty()){
        auto p = q.front();
        q.pop();

        int u = p.second;
        if(used[u]) continue;
        used[u] = 1;

        int now = p.first;
        if(now == k){
            ans++;
            continue;
        }

        for(auto v: g[u]){
            if(used[v]) continue;
            q.push({now+1, v});
        }
    }

    cout << ans;

}

