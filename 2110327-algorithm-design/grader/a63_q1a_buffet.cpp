#include<bits/stdc++.h>
using namespace std;

int qs[200010];

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n, k, m;
    cin >> n >> k >> m;
    for(int i=1;i<=n;i++){
        int x;
        cin >> x;
        qs[i] = qs[i-1] + (x-m);

    }

    while(k--){
        int p, w;
        cin >> p >> w;

        int st = p, ed = n;
        while(st < ed){
            int md = st + (ed-st)/2;

            if(qs[md]-qs[p-1] >= w){
                ed = md;
            }
            else {
                st = md+1;
            }
        }

        cout << st << "\n";
    }
}
