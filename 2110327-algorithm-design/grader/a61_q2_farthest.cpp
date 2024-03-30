#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9;

priority_queue<pair<int, int > > pq;
int w[1005][1005];
int dist[1005];

int main(){

    int n;
    cin >> n;
    for(int i=1;i<=n;i++){
        dist[i] = MAX;
        for(int j=1;j<=n;j++){
            cin >> w[i][j];
        }
    }

    pq.push({0, 1});
    dist[1] = 0;
    while(!pq.empty()){
        int u = pq.top().second;
        pq.pop();

        for(int v=1;v<=n;v++){
            if(u == v || w[u][v] == -1) continue;

            if(dist[v] > dist[u] + w[u][v]){
                dist[v] = dist[u] + w[u][v];
                pq.push({-dist[v], v});
            }
        }
    }

    int ans = 0;
    for(int i=1;i<=n;i++){
        ans = max(ans, dist[i]);
    }
    if(ans != MAX) cout << ans;
    else cout << "-1";

}
