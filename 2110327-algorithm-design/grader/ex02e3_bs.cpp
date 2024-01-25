#include<bits/stdc++.h>
using namespace std;

int a[100005];

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    for(int i=0;i<n;i++){
        cin >> a[i];
    }
    while(m--){
        int x;
        cin >> x;
        int st=0, ed=n-1;
        while(st<=ed){
            int md = (st + ed) / 2;
            if(a[md] > x){
                ed = md - 1;
            }
            else {
                st = md + 1;
            }
        }
        cout << st-1 << "\n";
    }
}
