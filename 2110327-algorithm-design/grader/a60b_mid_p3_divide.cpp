#include<bits/stdc++.h>
using namespace std;
const int mod = 1997;

int dp[505][505];

int main(){

    int n, k;
    cin >> n >> k;
    for(int i=1;i<=n;i++) dp[i][1] = 1;

    for(int i=1;i<=n;i++){
        for(int j=2;j<=k;j++){
            dp[i][j] = (dp[i-1][j-1] + j*dp[i-1][j]) % mod;
        }
    }

    cout << dp[n][k];

}
