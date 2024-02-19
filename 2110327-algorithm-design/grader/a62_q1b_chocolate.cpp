#include<bits/stdc++.h>
using namespace std;

int a[15], dp[10005];

int main(){

    int n, k;
    cin >> n >> k;
    for(int i=0;i<k;i++){
        cin >> a[i];
    }

    dp[0]=1;
    for(int i=0;i<=n;i++){
        for(int j=0;j<k;j++){
            dp[i+a[j]] += dp[i];
            dp[i+a[j]] %= 1000003;
        }
    }

    cout << dp[n];

}
