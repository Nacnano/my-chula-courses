#include<bits/stdc++.h>
using namespace std;

int a[205], dp[205][205];

int main(){
    int n;
    cin >> n;
    for(int i=0;i<=n;i++){
        cin >> a[i];
        dp[i][i] = 0;
    }

    for(int l=1;l<=n;l++){
        for(int i=1;i+l<=n;i++){
            int j = i+l;
            dp[i][j] = 1e9;
            for(int k=i;k<j;k++){
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + a[i-1]*a[k]*a[j]);
            }
        }
    }

    cout << dp[1][n];
}
