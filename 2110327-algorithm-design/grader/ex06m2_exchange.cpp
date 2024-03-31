#include<bits/stdc++.h>
using namespace std;

double dp[505][505];

int main(){

    int q;
    cin >> q;
    while(q--){
        int n;
        cin >> n;
        for(int i=1;i<=n;i++){
            for(int j=1;j<=n;j++){
                cin >> dp[i][j];
            }
        }



        for(int k=1;k<=n;k++){
            for(int i=1;i<=n;i++){
                for(int j=1;j<=n;j++){
                    dp[i][j] = max(dp[i][j], dp[i][k]*dp[k][j]);
                }
            }
        }

        int ok = false;
        for(int i=1;i<=n;i++){
            if(dp[i][i] > 1){
                ok = true;
                break;
            }
        }
        if(ok) cout << "YES\n";
        else cout << "NO\n";
    }
}
