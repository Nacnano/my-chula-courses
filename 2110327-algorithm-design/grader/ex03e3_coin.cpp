#include<bits/stdc++.h>
using namespace std;

int a[25];
int dp[10005];

int main(){

    int n, m;
    cin >> n >> m;

    for(int i=0;i<n;i++){
        cin >> a[i];
        dp[a[i]] = 1;
    }

    for(int i=0;i<=m;i++){
        dp[i] = 1e9;
        for(int j=0;j<n;j++){
            if(i-a[j] <0) continue;
            dp[i] = min(dp[i], dp[i-a[j]]+1);
        }
    }
    cout << dp[m];
}
