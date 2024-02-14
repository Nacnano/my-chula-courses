#include<bits/stdc++.h>
using namespace std;
const int pr=1e8+7, mxN=1e7+5;

int dp[2][mxN];

int main(){
    int n;
    cin >> n;
    dp[0][1] = 1;
    dp[1][1] = 1;
    for(int i=2;i<=n;i++){
        dp[0][i] = (dp[0][i-1] + 2*dp[1][i-1]) % pr;
        dp[1][i] = (dp[0][i-1] + dp[1][i-1]) % pr;
    }

    cout << (dp[0][n] + 2*dp[1][n]) % pr;
}
