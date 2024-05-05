
#include<bits/stdc++.h>
using namespace std;

int n, m, c[2005], ans = 0;
vector<int> g[2005];
vector<int> g2[2005];
vector<pair<int , int > > edges;
int indeg[2005], outdeg[2005], mx[2005], mn[2005];

int dfsmx(int u){
    if(g[u].empty()) {
        mx[u] = c[u];
        return c[u];
    }

    if(mx[u] > 0) return mx[u];

    int mxnow = c[u];
    for(auto v: g[u]){
        mxnow = max(mxnow, dfsmx(v));
    }

    mx[u] = mxnow;
    return mxnow;
}

int dfsmn(int u){
    if(g2[u].empty()) {
        mn[u] = c[u];
        return c[u];
    }

    if(mn[u] > 0) return mn[u];

    int mnnow = c[u];
    for(auto v: g2[u]){
        mnnow = min(mnnow, dfsmn(v));
    }

    mn[u] = mnnow;
    return mnnow;
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n >> m;
    for(int i=0;i<n;i++){
        cin >> c[i];
    }

    while(m--){
        int a, b;
        cin >> a >> b;
        edges.push_back({a, b});
        g[a].push_back(b);
        g2[b].push_back(a);
        indeg[b] += 1;
        outdeg[a] += 1;
    }

    for(int i=0;i<n;i++){
        if(indeg[i] == 0){
            dfsmx(i);
        }
        if(outdeg[i] == 0){
            dfsmn(i);
        }

    }

    for(auto val: edges){
        int u= val.first;
        int v = val.second;

        ans = max(ans, mx[v]- mn[u]);
    }

    cout << ans;
}
/*
5 4
5 2 1 4 7
0 1
1 2
2 3
3 4
*/
