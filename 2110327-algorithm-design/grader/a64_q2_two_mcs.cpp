#include<bits/stdc++.h>
using namespace std;

int n;
int a[500005];
int kadane_left[500005], kadane_right[500005];

int recur(int st, int ed){
    if(st==ed){
        return a[st];
    }

    int md = (st+ed)/2;
}


int kadane2ways(){
    int mx = -1e9, sum=0;
    for(int i=1;i<=n;i++){
        sum += a[i];
        mx = max(mx, sum);
        if(sum < 0){
            sum = 0;
        }

        kadane_left[i] = mx;
    }

    mx = -1e9, sum=0;
    for(int i=n;i>=1;i--){
         sum += a[i];
        mx = max(mx, sum);
        if(sum < 0){
            sum = 0;
        }

        kadane_right[i] = mx;
    }

    int ans = -1e9;
    for(int i=1;i<n;i++){
        ans = max(ans, kadane_left[i]+kadane_right[i+1]);
    }
    return max(ans, max(kadane_left[n], kadane_right[1]) );
}

int main(){
    cin >> n;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    cout << kadane2ways();
    // cout << recur(1, n);
}
