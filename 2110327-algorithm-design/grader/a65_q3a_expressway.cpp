#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9;

int dp[705][705];

int main(){

    int n;
    cin >> n;
    for(int i=1;i<=n;i++) for(int j=1;j<=n;j++) dp[i][j] = MAX;
    cin >> dp[1][2];
    dp[2][1] = dp[1][2];

    for(int i=3;i<=n;i++){
        int m;
        cin >> m;
        while(m--){
            int j, w;
            cin >> j >>  w;
            dp[i][j] = w;
            dp[j][i] = w;
        }
    }

    for(int k=1;k<=n;k++){
        for(int i=1;i<=n;i++){
            for(int j=1;j<=n;j++){
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);
            }
        }
        if(k >=3) cout << dp[1][2] << " ";
    }

}
