
#include<bits/stdc++.h>
using namespace std;

int dp[5005][5005], a[5005];

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n;
    cin >> n;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    for(int i=n;i>=1;i--){
        for(int j=i+1;j<=n;j++){
            dp[i][j] = max({dp[i+1][j-1] + max(a[i], a[j],  dp[i][j-2] + max(a[j-1], a[j]), dp[i+2][j] + max(a[i], a[i+1]) });
        }
    }

    cout << dp[1][n];

    return 0;
}
