#include<bits/stdc++.h>
using namespace std;

int a[1005], b[1005];
int dp[1005][1005];

int main(){

    int n;
    cin >> n;
    for(int i=0;i<n;i++){
        cin >> a[i];
        b[i] = a[i];
    }
    sort(b, b+n);
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            if(a[i] == b[j]){
                dp[i][j] = dp[max(0, i-1)][max(0, j-1)] + 1;
            }
            else{
                dp[i][j] = max(dp[i][max(0, j-1)], dp[max(0, i-1)][j]);
            }
        }
    }
    cout << dp[n-1][n-1];
}
