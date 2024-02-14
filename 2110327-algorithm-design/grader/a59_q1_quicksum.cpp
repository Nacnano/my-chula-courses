#include<bits/stdc++.h>
using namespace std;

int qs[1005][1005];

int main(){
    int n, m, k;
    cin >> n >> m >> k;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            int a;
            cin >> a;
            qs[i][j] = qs[i-1][j] + qs[i][j-1] - qs[i-1][j-1] + a;
        }
    }

    while(k--){
        int r1, c1, r2, c2;
        cin >> r1 >> c1 >> r2 >> c2;
        r1++, c1++, r2++, c2++;
        cout << qs[r2][c2] - qs[r1-1][c2] - qs[r2][c1-1] + qs[r1-1][c1-1] << "\n";
    }
}
