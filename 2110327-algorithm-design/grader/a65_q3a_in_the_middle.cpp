#include<bits/stdc++.h>
using namespace std;

vector<int> g[250005];

void bfs(int st, vector<int> &dist){

    queue<pair<int, int > > q;
    q.push({0, st});
    while(!q.empty()){
        int now = q.front().first;
        int u = q.front().second;
        q.pop();

        if(dist[u] != 1e9) continue;
        dist[u] = now + 1;

        for(auto v: g[u]){
             q.push({now+1, v});
        }
    }

}

int main(){

    int n, t1, t2, t3;
    cin >> n >> t1 >> t2 >> t3;

    for(int i=1;i<=n;i++){
        int x;
        cin >> x;
        while(x--){
            int v;
            cin >> v;
            g[i].push_back(v);
        }
    }

    vector<int> d1(n+5, 1e9), d2(n+5, 1e9), d3(n+5, 1e9);
    bfs(t1, d1);
    bfs(t2, d2);
    bfs(t3, d3);

    int ans = 1e9;
    for(int i=1;i<=n;i++){
        if(d1[i] == 1e9 || d2[i] == 1e9 || d3[i] == 1e9) continue;
        ans = min(ans, max({d1[i], d2[i], d3[i]}));
    }
    cout << ans-1;
}
