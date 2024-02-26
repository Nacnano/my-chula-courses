#include<bits/stdc++.h>
using namespace std;

int p[10005], dp[10005];

int main(){

    int n, k;
    cin >> n >> k;
    for(int i=1;i<=n;i++){
        cin >> p[i];
        dp[i] = 1e9;
    }

    for(int i=1;i<=k+1;i++){
        dp[i] = p[i];
    }

    for(int i=k+2;i<=n;i++){
        dp[i] = dp[i-1] + p[i];
        for(int j=-k;j<=k;j++){
            if(i+j-k-1<1 || i+j-k-1>n) continue;
            dp[i] = min(dp[i], dp[i+j-k-1] + p[i]);
        }
    }

    int ans = 1e9;
    for(int i=max(1, n-k);i<=n;i++){
        ans = min(ans, dp[i]);
    }
    cout << ans;
}
