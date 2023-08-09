#include<bits/stdc++.h>
using namespace std;

int main(){
    int n, m, q;
    int a[105][105];
    cin >> n >> m >> q;
    for(int i = 1;i <= n;i++){
        for(int j = 1; j <= m;j++){
            cin >> a[i][j];
        }
    }

    while(q--){
        int r1, r2, c1, c2;
        cin >> r1 >> c1 >> r2 >> c2;
        if(r1 > r2 || c1 > c2){
            cout << "INVALID\n";
        }
        else if(r1 > n || r2 < 1 || c1 > m || c2 < 1){
            cout << "OUTSIDE\n";
        }
        else {
            int max_number = INT_MIN;
            for(int i = max(1, r1) ;i <= min(n, r2);i++){
                for(int j = max(1, c1);j <= min(m, c2);j++){
                    max_number = max(max_number, a[i][j]);
                }
            }
            cout << max_number << "\n";
        }

    }

    return 0;
}
