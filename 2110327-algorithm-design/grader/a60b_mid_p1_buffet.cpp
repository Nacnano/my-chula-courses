#include<bits/stdc++.h>
using namespace std;

int has[10005];

int main(){
    int f, w, n;
    cin >> f >> w >> n;
    while(f--){
        int x;
        cin >> x;
        has[x] = 1;
    }

    int start = 1, ans=0;
    while(1){
        if(has[start] == 1){
            ans++;
            break;
        }
        start++;
    }
    for(int i=start+1;i<=n;i++){
        if(has[i] == 0) continue;
        if(start + 2*w >= i) continue;
        ans++;
        start = i;

    }
    cout << ans;
}
