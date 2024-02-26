#include<bits/stdc++.h>
using namespace std;

int a[2][200005];
int dp[200005][55][2]; // dp[position][number used][side]

int main(){

    int n, w, k;
    cin >> n >> w >> k;
    for(int t=0;t<2;t++) for(int i=1;i<=n;i++){
        cin >> a[t][i];
    }

    if(k==n){
        for(int i=1;i<=n;i++){
            dp[i][0][0] = max(dp[i-1][0][0], dp[max(0, i-w-1)][0][1] + a[0][i]);
            dp[i][0][1] = max(dp[i-1][0][1], dp[max(0, i-w-1)][0][0] + a[1][i]);
        }
        cout << max(dp[n][0][0], dp[n][0][1]);
    }
    else{
        for(int used=1;used<=k;used++){
            for(int i=1;i<=n;i++){
                dp[i][used][0] = max(dp[i-1][used][0], dp[max(0, i-w-1)][used-1][1] + a[0][i]);
                dp[i][used][1] = max(dp[i-1][used][1], dp[max(0, i-w-1)][used-1][0] + a[1][i]);
            }
        }
        cout << max(dp[n][k][0], dp[n][k][1]);
    }
}
