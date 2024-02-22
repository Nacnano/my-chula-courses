#include<bits/stdc++.h>
using namespace std;

int dp[35][35][35];

int main(){
    int n, m, k;
    cin >> n >> m >> k;

    dp[1][1][0] = 1;
    for(int len=1;len<=n;len++){
        for(int con=1;con<=m;con++){
            for(int change=0;change<=k;change++){
                dp[len+1][con+1][change] += dp[len][con][change];
                dp[len+1][1][change+1] += dp[len][con][change];
            }
        }
    }

    int ans =0;
    for(int i=1;i<=m;i++) ans += dp[n][i][k];
    cout << ans;
}
