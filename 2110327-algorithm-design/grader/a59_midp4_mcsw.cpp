#include<bits/stdc++.h>
using namespace std;

const int mxN = 4e5;
int n, w;
long long qs[mxN], a[mxN], mx_left[mxN];

long long mss(int st, int ed) {
    if(st == ed){
        return a[st];
    }

    int md = (st+ed)/2;

    long long r1 = mss(st, md), r2 = mss(md+1, ed);

    mx_left[md] = a[md];
    for(int i=md-1;i>=max(0, md-1-w);i--){
        mx_left[i] = max(mx_left[i+1], qs[md] - qs[i-1]);
    }

    long long r3 = -1e9;
    for(int i=md+1;i<=min(md+1+w, n-1);i++){

        r3 = max(r3, qs[i]-qs[md] + mx_left[i-w]);
    }

    cout << r1 << " " << r2 << " " << r3 << "\n";

    return max(r1, max(r2, r3));
}

int main(){

    cin >> n >> w;
    for(int i=0;i<n;i++){
        cin >> a[i];
    }

    qs[0] = a[0];
    for(int i=0;i<n;i++) {
        qs[i] = qs[i-1] + a[i];
    }

    cout << mss(0, n-1);

    return 0;
}
