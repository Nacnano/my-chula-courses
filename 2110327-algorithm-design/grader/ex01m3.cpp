#include<bits/stdc++.h>
using namespace std;

long long t[1005];

int main(){
    int n, q;
    cin >> n >> q;
    for(int i=0;i<n;i++){
        cin >> t[i];
    }

    while(q--){
        long long x, st=0, ed = 1e18, md, cnt;
        cin >> x;
        while(st < ed){
            md = (st+ed) / 2;
            cnt = n;
            for(int i=0;i<n;i++){
                cnt += md/t[i];
            }
            if(cnt >= x){
                ed = md;
            }
            else {
                st = md+1;
            }
        }
        cout << ed << "\n";
    }

}
