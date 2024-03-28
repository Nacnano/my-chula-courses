#include<bits/stdc++.h>
using namespace std;

int p[2005];
long long a[2005];
priority_queue<pair<long long, pair<int, int> > > pq;

int _find(int x){
    if(p[x] == x) return x;
    return p[x] = _find(p[x]);
}

int main(){
    int n;
    cin >> n;

    for(int i=1;i<=n;i++) p[i] = i;
    for(int i=1;i<=n;i++){
        cin >> a[i];
        for(int j=1;j<i;j++){
            pq.push({a[i]^a[j], {i, j} });
        }
    }

    long long ans=0;
    int cnt=1;
    while(!pq.empty()) {
        auto x = pq.top();
        pq.pop();
        int u = x.second.first;
        int v = x.second.second;
        int pu = _find(u);
        int pv = _find(v);

        if(pu == pv) continue;
        for(int i=1;i<=n;i++){
        cout << p[i] << " ";
        }
        cout << endl;
        cnt++;
        ans += x.first;
        p[pu] = pv;
    }
    cout << ans;
}
