#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9;

int n, m, k;
int a[105], bound[105], ans = MAX;

void solve(int lv, int val, int use){
    if(use == m) {
        ans = min(ans, abs(k-val));
        return;
    }

    if(lv == n+1) return;
    if(val - k > ans) return;
    if(k - val - bound[lv] > ans) return;


    solve(lv+1, val + a[lv], use+1);
    solve(lv+1 , val, use);
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n >> m >> k;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    for(int i=n;i>=1;i--){
        bound[i] = bound[i+1] + a[i];
    }

    sort(a+1, a+n+1);

    solve(1, 0, 0);
    cout << ans;

}
