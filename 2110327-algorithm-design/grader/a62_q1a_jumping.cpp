#include<bits/stdc++.h>
using namespace std;
const int mxN=1e6+5;

int a[mxN], dp[mxN];

int main(){

    int n;
    cin >> n;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    dp[1] = a[1];
    dp[2] = dp[1]+a[2];
    dp[3] = max(dp[1]+a[3], dp[2]+a[3]);
    for(int i=4;i<=n;i++){
        dp[i] = max({dp[i-3], dp[i-2], dp[i-1]}) + a[i];
    }

    cout << dp[n];
}
