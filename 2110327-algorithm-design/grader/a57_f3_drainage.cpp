#include<bits/stdc++.h>
using namespace std;

int has[1000005];

int main(){

    int n, l;
    cin >> n >> l;
    while(n--){
        int x;
        cin >> x;
        has[x] = 1;
    }

    int ans = 0, use = 0, i=1;
    while(i++){
        if(has[i] == 1){
            use = i;
            ans++;
            break;
        }
    }

    for(i=use+1;i<=1000000;i++){
        if(has[i] == 0) continue;
        if(use + l - 1 >= i) continue;
        ans++;
        use = i;
    }
    cout << ans;
}
