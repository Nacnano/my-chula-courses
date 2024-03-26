#include<bits/stdc++.h>
using namespace std;

int fire[5005], val[5005], sum, used[5005];
vector<int> g[5005];

int main(){

    int n, m, k;
    cin >> n >> m >> k;
    for(int i=0;i<n;i++){
        cin >> val[i];
        sum += val[i];
    }
    for(int i=1;i<=k;i++){
        cin >> fire[i];
    }
    while(m--){
        int u, v;
        cin >> u >> v;
        g[u].push_back(v);
    }

    for(int i=1;i<=k;i++){
        queue<int> q;
        q.push(fire[i]);
        while(!q.empty()){
            int u = q.front();
            q.pop();

            if(used[u]) continue;
            sum -= val[u];
            used[u] = 1;

            for(auto v: g[u]){
                q.push(v);
            }
        }
        cout << sum << " ";
    }
}
