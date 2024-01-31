#include<bits/stdc++.h>
using namespace std;

bool a[1<<15];

int cnt(int st, int ed){
    int ret = 0;
    for(int  i=st;i<=ed;i++) if(a[i]==1) ret++;
    return ret;
}

bool check(int st, int ed){
    if(st == ed) return true;

    int md = (st + ed) / 2;
    if(abs( cnt(st, md) - cnt(md+1, ed) ) > 1) return false;
    return check(st, md) && check(md+1, ed);
}

int main(){
    int n, k;
    cin >> n >> k;

    while(n--){
        for(int i=0;i< 1<<k;i++){
            cin >> a[i];
        }
        cout << (check(0, (1<<k) - 1) ? "yes\n" : "no\n");
    }
    return 0;
}
