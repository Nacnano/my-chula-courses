#include<bits/stdc++.h>
using namespace std;
const int mxN=5005, pr=1e8+7;

int dp[2][mxN];

int main(){

    int n, k;
    cin >> n >> k;
    dp[0][1] = 1;
    dp[1][1] = 1;
    for(int i=2;i<=n;i++){
        dp[0][i] = (dp[0][i-1] + dp[1][i-1]) % pr;
        dp[1][i] = dp[0][max(1, i-k+1)];
    }
    cout << (dp[0][n] + dp[1][n]) % pr;
}
