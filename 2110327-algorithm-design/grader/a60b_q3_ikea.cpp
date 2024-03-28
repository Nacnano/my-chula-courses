#include<bits/stdc++.h>
using namespace std;

int a[10005], b[10005];
int r[1005];

int main(){

    int n, e;
    cin >> n >> e;
    for(int i=1;i<=e;i++){
        cin >> a[i] >> b[i];
    }

    int q = 5;
    while(q--){
        int ok = 1;
        for(int i=1;i<=n;i++){
            int x;
            cin >> x;
            r[x] = i;
        }
        for(int i=1;i<=e;i++) {
            if(r[a[i]] > r[b[i]]) {
                ok = 0;
                break;
            }
        }
        if(ok) cout << "SUCCESS\n";
        else cout << "FAIL\n";
    }

}
