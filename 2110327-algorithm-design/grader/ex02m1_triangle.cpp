#include<bits/stdc++.h>
using namespace std;

int dp[105][105];

int main(){

    int n;
    cin >> n;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            int x;
            cin >> x;
            dp[i][j] = max(dp[i-1][j-1], dp[i-1][j])+x;
        }
    }

    int ans = -1e9;
    for(int i=1;i<=n;i++) ans = max(ans, dp[n][i]);
    cout << ans;
}
