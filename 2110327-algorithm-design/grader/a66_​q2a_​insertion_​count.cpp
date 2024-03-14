#include<bits/stdc++.h>
using namespace std;

int a[200005];

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    for(int i=1;i<=n;i++){
        cin >> a[i];
    }

    while(m--){
        int x;
        cin >> x;

        int ans=0;
        for(int i=1;a[i]!=x;i++){
            if(a[i] > x){
                ans++;
            }
        }
        cout << ans << "\n";
    }

    return 0;
}
