#include<bits/stdc++.h>
using namespace std;

int g[1005][1005];
int used[1005];
int dist[1005];
priority_queue<pair<int, int> > pq;

int main(){
    int n;
    cin >> n;
    for(int i=1;i<n;i++){
        for(int j=i+1;j<=n;j++){
            cin >> g[i][j];
            g[j][i] = g[i][j];
        }
    }

    for(int i=1;i<=n;i++) dist[i] = 1e9;

    int sum = 0;
    dist[1] = 0;
    pq.push({0, 1});
    while(!pq.empty()){
        auto x = pq.top();
        pq.pop();

        int u = x.second;
        if(used[u]) continue;
        used[u] = 1;

        sum += -x.first;

        for(int i=1;i<=n;i++){
            if(i == u) continue;

            if(dist[i] > g[u][i]){
                dist[i] = g[u][i];
                pq.push({-dist[i], i});
            }
        }
    }

    cout << sum;
}
