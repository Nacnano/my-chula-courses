#include<bits/stdc++.h>
using namespace std;
int n;
int ans = 0;
int queen[20];

bool check(int col, int row){

    for(int i=1;i<col;i++){
        if(queen[i] == row) return false;
        if(abs(queen[i]-row) == abs(i-col)) return false;
    }
    return true;
}


void solve(int col){
    if(col > n) {
        ans++;
        return;
    }

    for(int i=1;i<=n;i++){
        if(!check(col, i))  continue;
        queen[col] = i;
        solve(col+1);
        queen[col] = 1e9;
    }
}

int main(){

    cin >> n;
    for(int i=1;i<=n;i++) queen[i] = 1e9;
    solve(1);

    cout << ans;
}
