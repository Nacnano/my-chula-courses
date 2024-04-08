#include<bits/stdc++.h>
using namespace std;

vector<int> g[55];
int deg[55];
int ans = 0;

void dfs(int x){
}




int main(){

    int n, m;
    cin >> n >> m;
    while(m--){
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
        g[b].push_back(a);
        deg[a]++;
        deg[b]++;
    }

    dfs(0);


    cout << ans;
}
