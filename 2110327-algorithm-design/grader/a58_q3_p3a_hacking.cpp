#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9;

int dist[100005], c[10005];
priority_queue<pair<int, int> > pq;
vector<int> g[10005];
vector<int> st;

int main(){
    int n, m, k;
    cin >> n >> m >> k;
    while(k--){
        int x;
        cin >> x;
        pq.push({0, x});
        st.push_back(x);
    }
    for(int i=0;i<n;i++) {
        dist[i] = MAX;
        cin >> c[i];
    }
    while(m--){
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
        g[b].push_back(a);
    }

    for(auto v: st) dist[v] = c[v];
    while(!pq.empty()){
        auto x = pq.top();
        pq.pop();

        int u = x.second;

        for(auto v: g[u]){
            if(dist[v] > dist[u] + c[v]){
                dist[v] = dist[u] + c[v];
                pq.push({-dist[v], v});
            }
        }
    }

    int ans = 0;
    for(int i=0;i<n;i++){
        ans = max(ans, dist[i]);
    }
    cout << ans;
}
