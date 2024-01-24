#include<bits/stdc++.h>
using namespace std;

vector<pair<int, int> > v;
map<int, int> mm;

int main(){

    ios_base::sync_with_stdio(false), cin.tie(NULL);
    int n, q;
    cin >> n >> q;
    while(n--){
        int a, b;
        cin >> a >> b;
        v.push_back({a, b});

    }

    sort(v.begin(), v.end());

    int sum = 0;
    for(auto &x: v){
        sum += x.second;
        mm[sum] = x.first;
    }

    while(q--){
        int x;
        cin >> x;

        auto it = mm.lower_bound(x);
        cout << it->second << "\n";
    }

    return 0;
}
