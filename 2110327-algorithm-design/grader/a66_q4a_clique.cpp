#include<bits/stdc++.h>
using namespace std;

int n, ans;
int f[55][55];
int power[55], bound[55];
vector<int> use;

bool check(int add){
    for(auto x: use){
            if(!(f[add][x])) return false;
    }
    return true;
}

void solve(int len, int sum){
    ans=max(ans, sum);
    if(len > n) return;
    if(sum + bound[len] <= ans) return;


    if(check(len)){
        use.push_back(len);
        solve(len+1, sum+power[len]);
        use.pop_back();
    }

    solve(len+1, sum);
}

int main(){
    ios_base::sync_with_stdio(false);cin.tie(0);
    cin>>n;
    for(int i=1;i<=n;i++){
        cin>>power[i];
    }
    for(int i=n;i>=1;i--){
        bound[i] = bound[i+1] + power[i];
    }

    for(int i=1;i<=n;i++){
        for(int j=1;j<=n;j++){
            cin >> f[i][j];
        }
    }

    solve(1, 0);
    cout<<ans;

    return 0;
}


