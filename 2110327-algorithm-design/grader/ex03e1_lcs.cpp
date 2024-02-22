#include<bits/stdc++.h>
using namespace std;

int dp[505][505];

int main(){

    string a, b;
    cin >> a >> b;

    for(int i=1;a[i-1];i++){
        for(int j=1;b[j-1];j++){
            if(a[i-1] == b[j-1]){
                dp[i][j] = dp[i-1][j-1]+1;
            }
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);

        }
    }
    cout << dp[a.length()][b.length()];
}
