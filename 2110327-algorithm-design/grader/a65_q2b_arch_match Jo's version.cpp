#include<bits/stdc++.h>
using namespace std;

int main() {
    int n; cin >> n;
    int arr[n + 5] = {};
    int dp[n + 5][n + 5] = {};
    for (int i = 1; i <= n; i++) {
        cin >> arr[i];
    }
    for (int sz = 2; sz <= n; sz++) {
        for (int l = 1, r = sz; r <= n; l++, r++) {
            dp[l][r] = arr[l]*arr[r] + dp[l + 1][r - 1];
            for (int k = l; k < r; k++) {
                dp[l][r] = max(dp[l][r], dp[l][k] + dp[k + 1][r]);
            }
        }
    }
    cout << dp[1][n] << "\n";
}
