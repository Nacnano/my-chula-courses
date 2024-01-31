#include<bits/stdc++.h>
using namespace std;

bool a[1<<10];
bool check(int st, int ed, bool swp){
    if(st+1==ed){
        if(swp == 0 && a[st] == 0 && a[ed] == 1) return true;
        if(swp == 1 && a[st] == 1 && a[ed] == 0) return true;
        return false;
    }
    else if(st>=ed) return true;

    int md = st + (ed - st) / 2;
    if(swp==0){
        return (check(st, md, 0) || check(st, md, 1)) && check(md+1, ed, 0);
    }
    return (check(md+1, ed, 1) || check(md+1, ed, 0)) && check(st, md, 1);
}

int main(){
    int n, k;
    cin >> n >> k;

    while(n--){
        for(int i=0;i< 1<<k;i++){
            cin >> a[i];
        }
        cout << (check(0, (1<<k) - 1, 0) ? "yes\n" : "no\n");
    }
    return 0;
}
