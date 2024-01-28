#include<bits/stdc++.h>
using namespace std;

int deg[5010], cnt[5010];
int n, x;

int main(){
    ios_base::sync_with_stdio(false); cin.tie(0);

    cin >> n;
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            cin >> x;
            if(i<j) continue;

            if(x){
                deg[j]++;
                deg[i]++;
            }
        }
    }
    int k=0;
    for(int i=0;i<n;i++){
        k=max(k, deg[i]);
        cnt[deg[i]]++;
    }

    for(int i=0;i<=k;i++) cout << cnt[i] << " ";

    return 0;
}
