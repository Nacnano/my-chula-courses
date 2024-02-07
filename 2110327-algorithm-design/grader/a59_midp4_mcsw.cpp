#include<bits/stdc++.h>
using namespace std;

const int mxN = 2e5;
int n, w;
long long qs[mxN], a[mxN], mx_left[mxN];

long long mss(int st, int ed) {
    if(st == ed){
        return a[st];
    }

    int md = (st+ed)/2;
    long long r1 = mss(st, md), r2 = mss(md+1, ed);
    long long r3 = a[md];

    mx_left[md] = a[md];
    for(int i=md-1;i>=max(st, md-w+1);i--){
        mx_left[i] = max(mx_left[i+1], qs[md] - qs[i-1]);
    }

    for(int i=md+1;i<=min(md+w-1, ed);i++){
        r3 = max(r3, qs[i]-qs[md] + mx_left[max(i-w+1, st)]);
    }
    return max(r1, max(r2, r3));
}

int main(){

    cin >> n >> w;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    for(int i=1;i<=n;i++) {
        qs[i] = qs[i-1] + a[i];
    }

    cout << mss(1, n);

    return 0;
}
