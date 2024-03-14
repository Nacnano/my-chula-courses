#include<bits/stdc++.h>
using namespace std;

int deg = 0;
int a[600][600];

bool check(int x1, int y1, int x2, int y2){
    for(int i=y1;i<=y2;i++){
        for(int j=x1;j<=x2;j++){
            if(a[i][j]!=0) return false;
        }
    }

    return true;
}

int solve(int x1, int y1, int x2, int y2){
    int mdx = (x1+x2)/2, mdy = (y1+y2)/2;

    if(x1+1==x2 && y1+1==y2){
        if(a[y2][x2] != 0) return 0;
        if(a[y1][x1] == 0) return 0;
        if(a[y1][x2] == 0) return 0;
        if(a[y2][x1] == 0) return 0;
        if(a[y1][x1] == a[y1][x2]) return a[y1][x1];
        if(a[y1][x1] == a[y2][x1]) return a[y1][x1];
        if(a[y2][x1] == a[y1][x2]) return a[y2][x1];
        return 0;
    }

    int solve11 = solve(x1, y1, mdx, mdy);
    int solve12 = solve(mdx+1, y1, x2, mdy);
    int solve21 = solve(x1, mdy+1, mdx, y2);
    int solve22 = check(mdx+1, mdy+1, x2, y2);
    if(solve22 == false) return 0;
    if(solve11 == 0) return 0;
    if(solve12 == 0) return 0;
    if(solve21 == 0) return 0;
    if(solve11 != solve12 && solve12 != solve21 && solve21 != solve11) return 0;
    if(solve11 == solve12) return solve11;
    if(solve11 == solve21) return solve11;
    if(solve12 == solve21) return solve12;
    return 0;

}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n = 3;
    while(n--){
        int p;
        cin >> p;
        for(int i=1;i<=p;i++){
            for(int j=1;j<=p;j++){
                cin >> a[i][j];
            }
        }

        cout << solve(1, 1, p, p) << "\n";
    }
    return 0;
}
