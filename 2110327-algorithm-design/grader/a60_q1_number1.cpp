#include<bits/stdc++.h>
using namespace std;

int n, l, r;

int solve(int x, int st, int ed){
    if(ed < l || st > r) return 0;
    if(x==1) return 1;

    int md = (st+ed)/2;

    return solve(x/2, st, md-1) + solve(x/2, md+1, ed) + (l<=md && md<=r && x%2);
}


int main(){
    cin >> n >> l >> r;

    int len = 0;
    while(len < n){
        len = 2*len+1;
    }

    cout  << solve(n, 1, len);
}
