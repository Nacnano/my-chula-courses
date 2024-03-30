#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9;

vector<int> starts;
vector<pair<int, int> > g[5005];
priority_queue<pair<int, int> > pq;
int dist[5005];

int main(){

    int n, m, k, v;
    cin >> n >> m >> k >> v;

    while(k--){
        int x;
        cin >> x;
        starts.push_back(x);
    }

    while(m--){
        int a, b, w;
        cin >> a >> b >> w;
        g[b].push_back({a, w});
    }

    for(int i=0;i<n;i++) dist[i] = MAX;

    pq.push({0, v });
    dist[v] = 0;
    while(!pq.empty()){

        int x = pq.top().second;
        pq.pop();

        for(auto val: g[x]){
            int y = val.first, w = val.second;
            if(dist[y] > dist[x] + w){
                dist[y] = dist[x] + w;
                pq.push({-dist[y], y});
            }

        }
    }

    int ans = MAX;
    for(auto start: starts){
        ans = min(ans, dist[start]);
    }
    cout << ans;
}
