#include<bits/stdc++.h>
using namespace std;
const int mxN = 4005;

int n, a, b, c;

int idx(int i){
    if(i<0) return n+1;
    return i;
}

int dp[mxN];

int main(){
    cin >> n >> a >> b >> c;
    for(int i=0;i<=n+1;i++) dp[i] = -1;
    dp[0] = 0;
    for(int i=1;i<=n;i++){
        int mx = max({dp[idx(i-a)], dp[idx(i-b)], dp[idx(i-c)]});
        if(mx!=-1) dp[i] = mx + 1;
    }
    cout << dp[n];
}
