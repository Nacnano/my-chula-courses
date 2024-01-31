#include<bits/stdc++.h>
using namespace std;

int n, k;
vector<int> mat(4), ans(4);

vector<int> mul (vector<int> a, vector<int> b){
    vector<int> ret(4);
    ret[0] = (a[0]*b[0]+a[1]*b[2])%k;
    ret[1] = (a[0]*b[1]+a[1]*b[3])%k;
    ret[2] = (a[2]*b[0]+a[3]*b[2])%k;
    ret[3] = (a[2]*b[1]+a[3]*b[3])%k;
    return ret;
}

int main(){
    cin >> n >> k;
    for(int i=0;i<4;i++) cin >> mat[i];

    ans[0]=1, ans[3]=1;
    for(int i=0;i<=31;i++){
        if((1<<i) & n) ans=mul(ans, mat);
        mat=mul(mat, mat);
    }
    for(auto &x: ans) cout << x << " ";
    return 0;
}
