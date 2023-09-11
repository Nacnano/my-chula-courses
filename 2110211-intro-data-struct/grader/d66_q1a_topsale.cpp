#include<bits/stdc++.h>
using namespace std;
const int maxN = 3e5+5;

set<pair<int, int> > ss;
map<int, int> current_val;
map<int, bool> have;

void solve(){
    int n, m;
    cin >> n >> m;
    while(n--){
        int x;
        cin >> x;
        have[x] = true;
    }

    while(m--){
        int q;
        cin >> q;
        if(q == 1){
            int num , val;
            cin >> num >> val;

            if(!have[num]) continue;
            auto it = ss.find({-current_val[num], -num});
            if(current_val.find(num) != current_val.end()) current_val[num] += val;
            else current_val[num] = val;

            if(it==ss.end()){
                ss.insert({-current_val[num] ,-num});
            }
            else {
                ss.erase(it);
                ss.insert({-current_val[num], -num});
            }
        /*
        */
        }

        else if(q == 2){
            int k;
            cin >> k;
/*
            for(auto x = ss.begin(); x!=ss.end(); x++){
                cout << ss.size() << endl;
                cout << (*x).first << " " <<  (*x).second << endl;
            }*/
            // cout << "OUT\n";
            auto it = ss.lower_bound({-k, 1e9});
            // cout << (*it).second;
            if(it!=ss.end()) {
                //cout << "HOI";
                cout << -(*it).second << "\n";
            }
            else cout << "NONE\n";
        }
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
