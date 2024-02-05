#include<bits/stdc++.h>
using namespace std;

const int mxN = 1e5+5;
int n;
long long qs[mxN], a[mxN];

long long mss(int st, int ed) {
    if(st == ed){
        return a[st];
    }
    int md = (st+ed)/2;

    long long r1 = mss(st, md), r2 = mss(md+1, ed);

    long long mx_left = a[md], mx_right = a[md+1];

    for(int i=st-1;i<=md-1;i++){
        mx_left = max(mx_left, qs[md] - qs[i]);
    }

    for(int i=md+2;i<=ed;i++){
        mx_right = max(mx_right, qs[i]-qs[md]);
    }

    long long r3 = mx_right + mx_left;

    return max(r1, max(r2, r3));
}

int main(){

    cin >> n;
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
