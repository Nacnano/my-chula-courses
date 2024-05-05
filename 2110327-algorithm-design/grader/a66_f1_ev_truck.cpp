#include<bits/stdc++.h>
using namespace std;

int n, m, ans = 0, dist[505];

vector<pair<int, int >> g[505];
priority_queue<pair<int, int> > pq;

void shortest(int x){

    dist[x] = 0;
    pq.push({0, x});
    while(!pq.empty()){
        auto t = pq.top();
        pq.pop();

        int u = t.second;

        for(auto val: g[u]){
            int v = val.first;
            int w = val.second;

            if(dist[v] > dist[u] + w){
                dist[v] = dist[u] + w;
                pq.push({-dist[v], v});
            }
        }
    }
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n >> m;
    while(m--){
        int a, b, w;
        cin >> a >> b >> w;
        g[a].push_back({b, w});
        g[b].push_back({a, w});
    }

    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++) dist[j] = 1e9;
        shortest(i);


        for(int j=0;j<n;j++){
            if(j == i) continue;
            ans = max(ans, dist[j]);

        }
    }
    cout << ans;

}

