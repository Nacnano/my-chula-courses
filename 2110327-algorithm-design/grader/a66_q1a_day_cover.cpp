
#include<bits/stdc++.h>
using namespace std;
const int mxN=1e5+5;

int n, m;
int ans=1e9;
bool used[25], must[25];
vector<int> t[25];
int hsh[1005];
int hsh_keep[1005];

void solve(int step){
    if(step == m){
        bitset<1005> check;

        int cnt = 0;
        for(int i=0;i<m;i++){
            if(used[i]){
                cnt++;
                for(auto &val:t[i]){
                    check[val] = 1;
                }
            }
        }

        for(int i=1;i<=n;i++){
            if(!check[i]) return;
        }

        ans = min(ans, cnt);
        return;
    }

    if(must[step] == 1){
        used[step] = 1;
        solve(step+1);
        return;
    }

    used[step] = 1;
    solve(step+1);

    used[step] = 0;
    solve(step+1);
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n >> m;
    for(int i=0;i<m;i++){
        int k;
        cin >> k;
        while(k--){
            int x;
            cin >> x;
            t[i].push_back(x);
            hsh[x]++;
            hsh_keep[x] = i;
        }
    }

    for(int i=1;i<=n;i++){
        if(hsh[i]==1){
            must[hsh_keep[i]] = 1;
        }
    }

    solve(0);
    cout << ans;

    return 0;
}
