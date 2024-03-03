#include<bits/stdc++.h>
using namespace std;

int a[505], dp[505][505];

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n;
    cin >> n;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    for(int k=1;k<=n-1;k++){
        for(int i=1;i+k<=n;i++){
            dp[i][i+k] = dp[i+1][i+k];
            for(int j=i+1;j<=i+k;j++){
                dp[i][i+k] = max(dp[i][i+k], a[i]*a[j] + dp[i+1][j-1] + dp[j+1][i+k]);
            }
        }
    }

    cout << dp[1][n];

    return 0;
}
