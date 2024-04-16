#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9+5;

int dr[] = {0, 0, 1, -1}, dc[] = {1, -1, 0, 0};
int dp[11][11][7];
int a[7];

int main(){

    int r, c, p, q;
    cin >> r >> c >> p >> q;

    for(int i=0;i<r;i++){
        for(int j=0;j<c;j++){
            for(int k=0;k<6;k++){
                dp[i][j][k] = MAX;
            }
        }
    }

    for(int i=0;i<6;i++){
        cin >> a[i];
    }

    for(int k=0;K)

}
