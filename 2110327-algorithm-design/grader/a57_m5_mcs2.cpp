#include<bits/stdc++.h>
using namespace std;

int n, total_sum;
int a[100005];

int recur(int st, int ed){
     if(st==ed){
        return a[st];
    }

    int md = (st+ed)/2;

    int left = recur(st, md), right = recur(md+1, ed);

    int mx_left=INT_MIN, mx_right=INT_MIN;
    int mn_left=INT_MAX, mn_right=INT_MAX;

    int sum = 0;
    for(int i=md;i>=st;i--){
        sum+=a[i];
        mx_left = max(mx_left, sum);
        mn_left = min(mn_left, sum);
    }

    sum = 0;
    for(int i=md+1;i<=ed;i++){
        sum += a[i];
        mx_right = max(mx_right, sum);
        mn_right = min(mn_right, sum);
    }

    return max({left, right, total_sum - mn_left - mn_right, mx_left + mx_right});

}

int divide_conquer(int st, int ed) {

    int ret = INT_MIN;
    for(int i=1;i<=n;i++) {
        ret = max(ret, a[i]);
        total_sum += a[i];
    }
    if(ret < 0) return ret;
    return recur(1, n);
}

int quick_sum_2ways() {

    int qs_left[100005], qs_right[100005];
    for(int i=0;i<=n+1;i++) {
        qs_left[i] = -2e9;
        qs_right[i] = -2e9;
    }

    int sum = 0;
    for(int i=1;i<=n;i++){
        sum += a[i];
        qs_left[i] = max(qs_left[i-1], sum);
    }

    sum = 0;
    for(int i=n+1;i>=1;i--){
        sum += a[i];
        qs_right[i] = max(qs_right[i-1], sum);
    }

    int ans = -2e9;
    for(int i=0;i<=n-1;i++){
        ans = max(ans, qs_left[i]+qs_right[i+1]);
    }
    ans = max(ans, qs_left[1]);
    ans = max(ans, qs_right[n]);

    // Normal Kadane
    sum = 0;
    for(int i=1;i<=n;i++){
        sum += a[i];
        if(sum < 0){
            sum = a[i];
        }

        ans = max(ans, sum);
    }

    return ans;
}

int main(){
    cin >> n;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    // cout << quick_sum_2ways();
    cout << divide_conquer(1, n);
}
