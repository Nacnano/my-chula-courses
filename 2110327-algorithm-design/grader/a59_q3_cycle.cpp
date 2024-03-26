#include<bits/stdc++.h>
using namespace std;

vector<int> g[100005];
int used[100005];
int ans = -1;
int deg[100005];

int main(){

    int n;
    cin >> n;
    for(int i=0;i<n;i++){
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
        g[b].push_back(a);
        deg[a]++, deg[b]++;
    }

    queue<int> q;
    for(int i=0;i<n;i++) if(g[i].size() == 1) q.push(i);

    while(!q.empty()){
        int u = q.front();
        q.pop();
        n--;

        for(auto v: g[u]){
            deg[v]--;
            if(deg[v] == 1) q.push(v);
        }
    }
    cout << n;

}
