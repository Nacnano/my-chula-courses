#include<bits/stdc++.h>
using namespace std;

int main(){
    int x, n, k;
    cin >> x >> n >> k;
    int ans = 1;
    for(int i=0;i<=31;i++){
        if((1<<i) & n) ans=(ans*x)%k;
        x=(x*x)%k;
    }
    cout << ans;
    return 0;
}
