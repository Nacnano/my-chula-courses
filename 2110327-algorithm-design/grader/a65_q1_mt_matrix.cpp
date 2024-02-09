#include<bits/stdc++.h>>
using namespace std;

int n, m;
long long r, c;
int val[5];

int solve(long long x, long long y, long long len, bool neg, bool trans){
    if(len==2){
        x--, y--;
        int ret;
        if(trans){
            ret = val[2*x+y];
        }
        else {
            ret = val[2*y+x];
        }
        if(neg) ret *= -1;

        return ret;
    }

    len = len / 2;
    if(trans){
        swap(x, y);
    }

    if(y <= len){
        if(x <= len){
            return solve(x, y, len, neg, 0);
        }
        else {
            return solve(x-len, y, len, neg, 1);
        }
    }
    else {
        if(x <= len){
            return solve(x, y-len, len, !neg, 0);
        }
        else {
            return solve(x-len, y-len, len, !neg, 1);
        }
    }
}

int main(){
    cin >> n >> m;
    for(int  i=0;i<4;i++) cin >> val[i];

    while(m--){
        cin >> r >> c;

        cout << solve(c, r, 1LL << n, 0, 0) << "\n";
    }
}
