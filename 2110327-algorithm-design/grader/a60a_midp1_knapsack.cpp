#include<bits/stdc++.h>
using namespace std;

int v[505], w[505];
int dp[505][505];

int main(){

    int n, m;
    cin >> n >> m;
    for(int i=1;i<=n;i++){
        cin >> v[i];
    }
    for(int i=1;i<=n;i++){
        cin >> w[i];
    }

    for(int i=0;i<=n;i++){
        for(int j=0;j<=m;j++){
            cin >> dp[i][j];
        }
    }

    int y = n, x = m;
    vector<int> ans;
    while(x&&y){
        if(dp[y-1][x] == dp[y][x]){
            y--;
        }
        else {
            ans.push_back(y);
            x=x-w[y];
            y--;
        }
    }

    cout << ans.size() << "\n";
    for(auto x: ans){
        cout << x << " ";
    }
}
