#include<bits/stdc++.h>
using namespace std;
const int maxN = 1e5+5;

map<pair<string, string>, bool> mm;

void solve(){
    int n, m;
    cin >> n >> m;
    while(n--){
        string a, b;
        cin >> a >> b;
        mm[{a, b}] = 1;
    }
    while(m--){
        int k;
        bool can_buy = true;
        cin >> k;
        vector<pair<string, string> > v;
        for(int i=0;i<k;i++){
            string a, b;
            cin >> a >> b;
            v.push_back({a, b});
            if(!can_buy) continue;
            if(mm.find({a, b}) == mm.end()) can_buy = 0;
            else if(mm[{a, b}] == 0) can_buy = 0;
        }
        if(can_buy){
                for(auto x:v){
                    mm[x] = 0;
                }
        }
        cout << ( can_buy ? "YES" : "NO") << "\n";

    }

}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(0);

    int t = 1;
    // cin >> t;
    while(t--){
        solve();
    }

    return 0;
}
