#include<bits/stdc++.h>
using namespace std;

struct edge {
    int a, b, w;
};

int dist[105];
vector<edge> e;

int main(){

    int n, m, s;
    cin >> n >> m >> s;

    while(m--){
        int a, b, w;
        cin >> a >> b >> w;
        e.push_back({a, b, w});
    }

    for(int i=0;i<n;i++) dist[i] = 1e9;

    dist[s] = 0;
    for(int i=0;i<n-1;i++){
        for(auto x: e){
            int a = x.a, b = x.b, w = x.w;
            dist[b] = min(dist[b], dist[a] + w);
        }
    }

    for(auto x: e){
        int a = x.a, b = x.b, w = x.w;
        if(dist[b] > dist[a] + w) {
            cout << "-1";
            return 0;
        }
    }

    for(int i=0;i<n;i++) {
        cout << dist[i] << " ";
    }
}
