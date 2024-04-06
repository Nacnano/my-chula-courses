#include<bits/stdc++.h>
using namespace std;

int ans = 0;

void solve(int x, int last){
    if(x < last) return;
    ans++;

    for(int i=last;i<=x;i++){
        solve(x-i, i);
    }
}

int main(){

    int n;
    cin >> n;
    solve(n, 1);

    cout << ans;
}
