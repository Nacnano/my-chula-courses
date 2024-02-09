#include<bits/stdc++.h>
using namespace std;

vector<int> g[50005];
int cnt[50005][40], ans = 0;
int n, k;

void gen(int x){
    cnt[x][0] = 1;
    for(auto &child: g[x]){
        gen(child);
        for(int i=0;cnt[child][i];i++){
            cnt[x][i+1] += cnt[child][i];
        }
    }
}

void solve(int x){
    int l=0, r=0;
    if(g[x].size() == 2){
        r = g[x][1];
    }
    if(g[x].size() >= 1){
        l = g[x][0];
    }

    for(int i=0;i<=k-2;i++){
        ans += cnt[l][i] * cnt[r][k-2-i];
    }
    ans += cnt[l][k-1];
    ans += cnt[r][k-1];

    if(l) solve(l);
    if(r) solve(r);
}

int main(){
    cin >> n >> k;
    for(int i=1;i<=n-1;i++){
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
    }

    gen(1);
    solve(1);
    cout << ans;

}
