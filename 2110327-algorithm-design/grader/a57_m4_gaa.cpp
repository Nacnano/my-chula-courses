#include<bits/stdc++.h>
using namespace std;

vector<int> len_g;
char ans;

void solve(int idx, int pos){
    if(len_g[idx]+1 <= pos && pos <= len_g[idx] + idx + 3){
        if(pos==len_g[idx]+1) ans = 'g';
        else ans = 'a';
        return;
    }

    if(pos > len_g[idx] + idx + 3) solve(idx-1, pos - (len_g[idx] + idx +3));
    else solve(idx-1 , pos);

}

int main(){
    int len_now = 3;
    len_g.push_back(0);
    for(int i=0;len_now<2e9;i++){
        len_g.push_back(len_now);
        len_now = 2*len_now + i+4;
    }

    int n;
    cin >> n;

    int st_idx = lower_bound(len_g.begin(), len_g.end(), n) - len_g.begin();
    solve(st_idx, n);
    cout << ans;

}
