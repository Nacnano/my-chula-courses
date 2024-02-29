#include<bits/stdc++.h>
using namespace std;

int a[15];
int dp[15][10005];

int main(){

    int n, m;
    cin >> n >> m;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    for(int i=0;i<=n;i++) for(int j=0;j<=m;j++) dp[i][j] = 1e9;
    dp[0][0] = 0;

    int ans=1e9;
    for(int k=1;k<=n;k++){
        for(int i=0;i<=m;i++){
            if(dp[k-1][i] == 1e9) continue;
            for(int j=1;i+j*j<=m;j++){
                dp[k][i+j*j] = min(dp[k-1][i] + (j-a[k])*(j-a[k]), dp[k][i+j*j]);
            }
        }
    }

    cout << (dp[n][m] == 1e9 ? -1 : dp[n][m]);
}
