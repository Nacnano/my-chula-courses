#include<bits/stdc++.h>
using namespace std;

int dp[505][505];

int main(){
    int n, m;
    cin >> n >> m;
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            int x;
            cin >> x;
            if(i && j) dp[i][j] = max({dp[i-1][j-1]+2*x, dp[i-1][j]+x, dp[i][j-1]+x});
            else if(i) dp[i][j] = dp[i-1][j] + x;
            else if(j) dp[i][j] = dp[i][j-1] + x;
            else dp[i][j] = x;
        }
    }
    cout << dp[n-1][m-1];
}
