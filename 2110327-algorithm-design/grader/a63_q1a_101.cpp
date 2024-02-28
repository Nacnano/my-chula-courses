#include<bits/stdc++.h>
using namespace std;
const int mod = 1e8+7;

int n;

void small_n(){
    int dp[5][10005];
//  dp[j][i] : strings length i that end that with j,
//  examples of j
//  j = 0 : end with 00
//  j = 1 : end with 01
//  j = 3 : end with 1

    for(int i=0;i<4;i++) dp[i][2] = 1;

    for(int i=3;i<=n;i++){
        for(int j=0;j<4;j++){
            if(j == 1){
                dp[j][i] = dp[0][i-1];
            }
            else if(j == 0){
                dp[j][i] = dp[0][i-1] + dp[2][i-1];
            }
            else if(j == 2 || j == 3){
                dp[j][i] = dp[1][i-1] + dp[3][i-1];
            }
            dp[j][i] %= mod;
        }
    }

    int ans = 0;
    for(int i=0;i<4;i++) ans += dp[i][n];
    cout << ans % mod;
}


void big_n(){

    while(n){
        if(n&1){



        }
    }


}

int main(){

    cin >> n;
    if(n <= 10000){
        small_n();
    }
    else{
        big_n();
    }
}
