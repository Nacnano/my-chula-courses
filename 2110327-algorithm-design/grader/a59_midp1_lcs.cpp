#include<bits/stdc++.h>
using namespace std;

int dp[1005][1005];

int main(){

    int n, m;
    string a, b;
    cin >> n >> m;
    cin >> a >> b;

    for(int i=0;i<=n;i++){
        for(int j=0;j<=m;j++){
            cin >> dp[i][j];
        }
    }

    int x = m, y = n;

    string ans = "";
    while(dp[y][x] > 0){
        if(dp[y-1][x-1]+1 == dp[y][x]){
            ans += a[y-1];
            y--, x--;
        }
        else if( dp[y-1][x] == dp[y][x]){
            y--;
        }
        else if( dp[y][x-1] == dp[y][x]){
            x--;
        }
    }

    for(int i=ans.length()-1;i>=0 ;i--){
        cout << ans[i];
    }

}
