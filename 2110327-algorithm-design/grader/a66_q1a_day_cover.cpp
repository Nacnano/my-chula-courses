
#include<bits/stdc++.h>
using namespace std;
const int mxN=1e5+5;

int n, m;
int ans=1e9;
int total[mxN];
vector<int> t[25];

void solve(int step, int cnt, int now){
    if(step == m){
        if(cnt==n) ans = min(ans, now);
        return;
    }

    solve(step+1, cnt, now);
    for(auto x: t[step]){
        if(!total[x]) cnt++;
        total[x]++;
    }

    solve(step+1, cnt, now+1);
    for(auto x: t[step]){
        if(total[x]==1) cnt--;
        total[x]--;
    }

}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n >> m;
    for(int i=0;i<m;i++){
        int k;
        cin >> k;
        while(k--){
            int x;
            cin >> x;
            t[i].push_back(x);
        }
    }

    solve(0, 0, 0);
    cout << ans;

    return 0;
}
