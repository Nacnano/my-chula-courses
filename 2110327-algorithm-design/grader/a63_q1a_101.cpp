#include<bits/stdc++.h>
using namespace std;
const int mod = 1e8+7;

long long n;

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
            if(j==1){
                dp[j][i] = dp[0][i-1];
            }
            else if(j==0){
                dp[j][i] = dp[0][i-1] + dp[2][i-1];
            }
            else if(j==2 || j==3){
                dp[j][i] = dp[1][i-1] + dp[3][i-1];
            }
            dp[j][i] %= mod;
        }
    }

    int ans = 0;
    for(int i=0;i<4;i++) ans += dp[i][n];
    cout << ans % mod;
}


long long mat[65][5][5];
long long a[65][5][5];
void big_n(){

    /*
    mat[1] = {
        {1, 0, 1, 0}, x0 = x0 + x2
        {1, 0, 0, 0}, x1 = x0 (no x2 because it append 1 to 10)
        {0, 1, 0, 1}, x2 = x1 + x3
        {0, 1, 0, 1}  x3 = x1 + x3
        };
    */
    mat[1][0][0] = 1;
    mat[1][0][2] = 1;
    mat[1][1][0] = 1;
    mat[1][2][1] = 1;
    mat[1][2][3] = 1;
    mat[1][3][1] = 1;
    mat[1][3][3] = 1;

    // a[1] is an identity matrix that the sum of all entries of row i
    // is the number of strings that ends with i
    for(int i=0;i<4;i++) a[1][i][i] = 1;

    int cnt = 1;
    n-=2;
    while(n){
        cnt++;

        if(n&1){
            // concept: a = mat^(2^cnt) * a : get something like mat^256*mat^64*mat^4*mat*a
            for(int i=0;i<4;i++){
                for(int j=0;j<4;j++){
                    for(int k=0;k<4;k++){
                        a[cnt][i][j] += mat[cnt-1][i][k]* a[cnt-1][k][j];
                        a[cnt][i][j] %= mod;
                    }
                }
            }
        }
        else {
            for(int i=0;i<4;i++){
                for(int j=0;j<4;j++){
                    a[cnt][i][j] = a[cnt-1][i][j];
                }
            }
        }

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
    for(int i=0;i<4;i++) {
        for(int j=0;j<4;j++) {
            ans += a[cnt][i][j];
        }
    }
    cout << ans % mod;
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
