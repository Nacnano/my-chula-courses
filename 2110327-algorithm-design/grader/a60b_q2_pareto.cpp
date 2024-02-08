#include<bits/stdc++.h>
using namespace std;

pair<int,int> p[100005];

vector<int> pareto(int st, int ed){
    vector<int> ret;
    if(st==ed){
        ret.push_back(st);
        return ret;
    }

    int md = (st+ed)/2;
    vector<int> left = pareto(st, md), right = pareto(md+1, ed);

    int mx=0;
    for(auto it:right){
        mx = max(mx, p[it].second);
        ret.push_back(it);
    }
    for(auto it: left){
        if(p[it].second >= mx){
            ret.push_back(it);
        }
    }

    return ret;
}

int main(){

    int n;
    cin >> n;
    for(int i=0;i<n;i++){
        cin >> p[i].first >> p[i].second;
    }
    sort(p, p+n);

    cout << pareto(0, n-1).size();
}
