#include<bits/stdc++.h>
using namespace std;

long long cost[500005], qs[500005];

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n, m, k;
    cin >> n >> m >> k;
    for(int i=1;i<=n;i++){
        long long x;
        cin >> x;
        qs[i] = qs[i-1] + x;
    }

    while(m--){
        int a;
        long long b, ans=0;
        cin >> a >> b;

        int st = a+1, ed = n+1;
        while(st<ed){
            int md = (st+ed)/2;
            long long total = qs[md] - qs[a] + (md-a)*k;
            if(total > b){
                ed = md;
            }
            else {
                st = md+1;
                ans = max(ans, qs[md]-qs[a]);
            }
        }
        cout << ans << "\n";
    }
}
