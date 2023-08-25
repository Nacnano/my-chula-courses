#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pii pair<int, int>
#define f first
#define s second

const int maxN = 1e5 + 5;
const int p = 1e9 + 7;

map<int, int> mm;
map<int, int>::iterator it;

void solve(){
    int n, m;
    cin >> n >> m;
    while(n--){
        int a;
        cin >> a;
        if(mm.find(a)==mm.end()) mm[a]=0;
        mm[a]++;
    }

    bool lose = 0;
    int ans = 1;
    while(m--){
        int q;
        cin >> q;
        while(q--){
            int x;
            cin >> x;
            it = mm.upper_bound(x);
            if(it==mm.end()){
                lose = 1;
            }
            else{
                it->second--;
                if(it->second==0){
                mm.erase(it);
                }
            }
        }
        if(!lose) ans++;
    }

    cout << ans;

}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(0);

    int q=1;
    // cin >> q;
    while(q--){
        solve();
    }
    return 0;
}
