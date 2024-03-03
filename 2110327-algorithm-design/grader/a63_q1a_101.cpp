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
    cout << endl;
    for(int i=0;i<4;i++){
        cout << dp[i][n] << " ";
    }
    cout << endl;
}


long long mat[40][5][5];
long long a[40][5] = {1, 1, 1, 1};
void big_n(){
    mat[1][0][0] = 1;
    mat[1][0][2] = 1;
    mat[1][1][0] = 1;
    mat[1][2][1] = 1;
    mat[1][2][3] = 1;
    mat[1][3][1] = 1;
    mat[1][3][3] = 1;
    /*
    mat[1] = {
        {1, 0, 1, 0},
        {1, 0, 0, 0},
        {0, 1, 0, 1},
        {0, 1, 0, 1}
        };
    */

    int cnt = 1;
    n-=2;
    while(n){
        if(n&1){
            for(int i=0;i<4;i++){
                for(int j=0;j<4;j++){
                    a[cnt][i] += a[cnt-1][i] + mat[cnt][i][j];
                    a[cnt][i] %= mod;
                }
            }
        }
        else {
            for(int i=0;i<4;i++){
                a[cnt][i] = a[cnt-1][i];
            }
        }
        for(int i=0;i<4;i++) cout << a[cnt][i] << " ";
        cout << endl;

        cnt++;
        for(int i=0;i<4;i++){
            for(int j=0;j<4;j++){
                for(int k=0;k<4;k++){
                    mat[cnt][i][j] += mat[cnt-1][i][k]*mat[cnt-1][k][j];
                    mat[cnt][i][j] %= mod;
                 }
            }
        }

        n >>= 1;
    }

    long long ans = 0;
    for(int i=0;i<4;i++) ans += a[cnt-1][i];
    cout << ans % mod;
}

int main(){

    cin >> n;
    if(n <= 10000){
        small_n();
        cout << endl;
        big_n();
    }
    else{
        big_n();
    }
}
