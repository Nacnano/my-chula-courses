#include<bits/stdc++.h>
using namespace std;

int dp[2][10005];

int main(){

    int n;
    cin >> n;
    for(int i=1;i<=n;i++){
        int x;
        cin >> x;
        dp[1][i] = max(dp[0][i-2], dp[1][i-3]) + x;
        dp[0][i] = max(dp[0][i-1], dp[1][i-1]);
    }

    cout << max(dp[0][n], dp[1][n]);
}
