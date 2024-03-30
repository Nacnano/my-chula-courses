#include<bits/stdc++.h>
using namespace std;

int dp[105][105];

int main(){

    int n, m, s;
    cin >> n >> m >> s;

    for(int i=0;i<n;i++) for(int j=0;j<n;j++) if(i!=j) dp[i][j] = 1e9;
    while(m--){
        int a, b, w;
        cin >> a >> b >> w;
        dp[a][b] = w;
    }

    for(int k=0;k<n;k++){
        for(int i=0;i<n;i++){
            for(int j=0;j<n;j++){
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j]);
            }
        }
    }


    for(int i=0;i<n;i++){
        if(dp[i][i] < 0 ) {
            cout << "-1";
            return 0;
        }
    }


    for(int i=0;i<n;i++) {
        cout << dp[s][i] << " ";
    }
}
