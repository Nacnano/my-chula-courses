#include<bits/stdc++.h>
using namespace std;
const int mxN=3e5+5;

int n;
int a[mxN];
int qs[mxN];
vector<int> hsh[2005];

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n;
    for(int i=1;i<=n;i++){
        cin >> a[i];
        qs[i] = qs[i-1] + a[i];

        hsh[a[i]+1000].push_back(i);
    }

    int ans = -1e9;
    for(int i=0;i<=2000;i++){
        if(hsh[i].empty()) continue;
        int st = hsh[i][0];
        int sum = a[st];
        ans = max(ans, sum);
        if(hsh[i].size()==1) continue;
        for(auto &idx:hsh[i]){
            if(qs[idx] - qs[st - 1] < 0){
                sum = a[idx];
                st = idx;
            }
            else {
                sum = qs[idx] - qs[st - 1];
            }
            ans = max(ans, sum);
        }
    }

    cout << ans;

    return 0;
}
