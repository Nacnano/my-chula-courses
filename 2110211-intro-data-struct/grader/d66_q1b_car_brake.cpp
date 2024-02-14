#include<bits/stdc++.h>
using namespace std;

map<int, int> brake;
vector<pair<int, int> > t, v;

int main(){
    int n, m, k;
    cin >> n >> m >> k;
    for(int i=0;i<n;i++){
        int time, dv;
        cin >> time >> dv;
        brake[time] = dv;
    }

    int now = k;
    t.push_back({0, k});
    for(auto &it: brake){
        now = max(0, now-it.second);
        t.push_back({it.first, now});
    }
    for(int i=t.size()-1;i>=0;i--){
        v.push_back({t[i].second, t[i].first});
    }

    while(m--){
        int q, x;
        cin >> q >> x;
        if(q==1){
            auto it = upper_bound(t.begin(), t.end(), make_pair(x, INT_MAX));
            it--;
            cout << it->second <<  "\n";
        }
        else {
            auto it = lower_bound(v.begin(), v.end(), make_pair(x, INT_MIN));
            if(it == v.end()) cout << "0\n";
            else {
                it--;
                cout << it->second << "\n";
            }
        }

    }
}
