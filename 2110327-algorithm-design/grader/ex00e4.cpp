#include<bits/stdc++.h>
using namespace std;

int n, m;
int arr[25];

void solve(int lv, int cnt){
    if(lv==n && cnt==m){
        for(int i=0;i<n;i++){
            cout << arr[i];
        }
        cout << "\n";
        return;
    }
    if(lv==n) return;

    arr[lv] = 1;
    solve(lv + 1, cnt + 1);

    arr[lv] = 0;
    solve(lv + 1, cnt);
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);
    cin >> m >> n;

    solve(0, 0);
    return 0;
}
