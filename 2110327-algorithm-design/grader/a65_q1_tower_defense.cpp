#include<bits/stdc++.h>
using namespace std;

int ans=1e9, sum, n, m, k, w;
int h[15], p[15], t[15];
int target[15];
int hit[15];

void solve(int lv){
    if(lv == k){
        for(int i=0;i<m;i++) hit[i]=0;
        for(int i=0;i<k;i++){
            if(abs(p[target[i]]-t[i]) <= w){
                hit[target[i]]++;
            }
        }
        int sum_now = sum;
        for(int i=0;i<m;i++){
            sum_now -= min(hit[i], h[i]);
        }
        ans = min(sum_now, ans);
        return;
    }

    for(int i=0;i<m;i++){
        target[lv]=i;
        solve(lv+1);
    }

}

int main(){
    cin >> n >> m >> k >> w;
    for(int i=0;i<m;i++){
        cin >> p[i];
    }
    for(int i=0;i<m;i++){
        cin >> h[i];
        sum += h[i];
    }
    for(int i=0;i<k;i++){
        cin >> t[i];
    }

    solve(0);
    cout << ans;
}
