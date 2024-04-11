#include<bits/stdc++.h>
using namespace std;

pair<int, int> x[200005];

int main(){
    int n, m, k, w;
    cin >> n >> m >> k >> w;
    for(int i=0;i<m;i++){
        cin >> x[i].first;
    }
    for(int i=0;i<m;i++){
        cin >> x[i].second;
    }

    sort(x, x+m);

    int idx = 0;
    for(int i=1;i<=n;i++){
        while(x[idx].first < i-w) idx++;
        if(x[idx].first > i+w) continue;

        x[idx].second--;
        k--;

        if(k == 0) break;
        if(x[idx].second == 0) idx++;
    }

    int ans = 0;
    for(int i=0;i<m;i++){
        ans += x[i].second;
    }
    cout << ans;
}
