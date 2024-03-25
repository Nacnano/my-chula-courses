#include<bits/stdc++.h>
using namespace std;

vector<int> g[10005];
int used[10005];
int n, m, k, cnt;

int main(){

    cin >> n >> m >> k;
    while(m--){
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
        g[v].push_back(u);
    }

    int ans = 0;
    for(int i=0;i<n;i++){

        cnt = 0;
        for(int j=0;j<n;j++) used[j] = 0;
        queue<pair<int, int> > q;

        q.push({i, 0});
        while(!q.empty()){
            auto x = q.front();
            q.pop();
            int u = x.first;
            if(used[u]) continue;
            used[u] = 1;
            cnt++;
            if(x.second == k){
                continue;
            }

            for(auto v: g[u]){
                q.push({v ,x.second + 1});
            }
        }
        ans = max(ans, cnt);
    }
    cout << ans;
}
