#include<bits/stdc++.h>
using namespace std;

int n, k;
vector<int> v(1e5+5);

void solve(int l, int r){
    if(k < 2 || r - l < 2) return;
    k -= 2;
    int md = (r + l) / 2;
    swap(v[md - 1], v[md]);
    solve(l, md);
    solve(md, r);
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n >> k;
    if(k % 2 == 0) {
        cout << -1;
        return 0;
    }

    for(int i = 0;i < n;i++) v[i] = i + 1;

    k--;
    solve(0, n);
    if(k > 0) {
        cout << -1;
        return 0;
    }
    for(int i = 0;i < n;i++){
        cout << v[i] << " ";
    }

    return 0;
}
