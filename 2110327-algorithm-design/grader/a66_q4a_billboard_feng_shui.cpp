#include<bits/stdc++.h>
using namespace std;

int a[55], pat[55], possible[55];
int choose[55];
int ans = 0;
int n, k;
int hsh;

void rec(int lv, int check, int val){
    if(lv >= n+1){
        ans = max(ans, val);
        return;
    }

    if(val + possible[lv] < ans) return;

    int match = 0;
    if(lv >= k){
        check *= 2;
        check -= choose[lv-k] * (1<<(k-1));
        check += choose[lv-1];
        if(hsh == check) match = 1;
    }
    else {
        check *= 2;
        check += choose[lv-1];
    }
    if(match == 0){
        if(choose[lv-1] == 0){
            choose[lv] = 1;
            rec(lv+1, check, val + a[lv]);
            choose[lv] = 0;
        }
        choose[lv] = 0;
        rec(lv+1, check, val);

    }
    else {
        if(choose[lv-1] == 0 && pat[k] == 0){
            choose[lv] = 1;
            rec(lv+1, check, val + a[lv]);
            choose[lv] = 0;
        }
        if(pat[k] == 1){
            choose[lv] = 0;
            rec(lv+1, check, val);
        }
    }


}

void solve(){
    cin >> n >> k;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }
    for(int i=n;i>=1;i--) possible[i] += possible[i+1] + a[i];

    hsh = 0;
    for(int i=1;i<=k;i++){
        cin >> pat[i];
        hsh *= 2;
        hsh += pat[i];
    }

    hsh -= pat[k];
    hsh /= 2;

    choose[1] = 1;
    rec(2, 0, a[1]);

    choose[1] = 0;
    rec(2, 0, 0);
    cout << ans;

}

int main(){

    ios_base::sync_with_stdio(0), cin.tie(NULL);

    int t = 1;
    // cin >> t;
    while(t--){
        solve();
    }

    return 0;
}

