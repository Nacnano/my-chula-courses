#include<bits/stdc++.h>
using namespace std;

int g[1005][1005];
int par[1005];
priority_queue<pair<int, pair<int, int> > > pq;

int _find(int x){
    if(par[x] == x) return x;
    return par[x] = _find(par[x]);
}

int main(){
    int n;
    cin >> n;
    for(int i=1;i<n;i++){
        for(int j=i+1;j<=n;j++){
            cin >> g[i][j];
            pq.push({-g[i][j], {i, j}});
        }
    }

    for(int i=1;i<=n;i++) par[i] = i;

    int ans = 0;
    while(!pq.empty()){
        int w = -pq.top().first;
        int u = pq.top().second.first;
        int v = pq.top().second.second;
        pq.pop();

        int pu = _find(u);
        int pv = _find(v);

        if(pu == pv) continue;
        ans += w;
        par[pu] = par[pv];
    }

    cout << ans;
}
