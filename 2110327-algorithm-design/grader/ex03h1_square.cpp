#include<bits/stdc++.h>
using namespace std;

string s[1005];
int dp[1005][1005];

int main(){

    int n, m;
    cin >> n >> m;
    for(int i=0;i<n;i++){
        cin >> s[i];
        for(int j=0;j<m;j++){
            s[i][j] -= '0';
        }
    }

    int ans = 0;
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            if(i&&j){
                if(s[i-1][j] && s[i][j-1] && s[i-1][j-1] && s[i][j]) dp[i][j] = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
                else dp[i][j] = s[i][j];
            }
            else {
                dp[i][j] = s[i][j];
            }
            ans = max(ans, dp[i][j]);
        }
    }
    cout << ans;
}
