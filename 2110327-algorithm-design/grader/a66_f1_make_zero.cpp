#include<bits/stdc++.h>
using namespace std;

int n, ans=1e9;;
void solve(int x, int cnt){
    x %= 16777216;
    if(x == 0){
        ans = min(ans, cnt);
        return;
    }
    if(cnt > 25) return;
    solve(x+1, cnt+1);
    solve(2*x, cnt+1);
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n;
    solve(n, 0);
    cout << ans;
}
