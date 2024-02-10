#include<bits/stdc++.h>
using namespace std;

vector<pair<int, int> > X, Y;

int dist(pair<int,int> a, pair<int, int> b){
    int dx = a.first - b.first;
    int dy = a.second - b.second;
    return dx*dx + dy*dy;
}

int solve(vector<pair<int,int>> &vx, vector<pair<int, int>> &vy){
    if(vx.size()==1) return 2e9;
    if(vx.size()==2) return dist(vx[0], vx[1]);

    int md = (vx.size()-1)/2;

    vector<pair<int, int> > nxl, nyl, nxr, nyr;
    for (int i=0;i<=md;i++){
        nxl.push_back(vx[i]);
    }
    for(int i=md+1;i<vx.size();i++){
        nxr.push_back(vx[i]);
    }
    for(auto p: vy){
        if(p.first <= nxl.back().first){
            nyl.push_back(p);
        }
        else {
            nyr.push_back(p);
        }
    }

    int ret = min(solve(nxl, nyl), solve(nxr, nyr));

    vector<pair<int, int> > gap;
    for(auto p:vy){
        if((p.first-nxl.back().first)*(p.first-nxl.back().first) < ret){
            gap.push_back(p);
        }
    }

    for(int i=0;i<gap.size();i++){
        for(int j=i+1;j<gap.size();j++){
            if ((gap[i].second - gap[j].second) * (gap[i].second - gap[j].second) >= ret) break;
            ret = min(ret, dist(gap[i], gap[j]));
        }
    }

    return ret;
}

int main(){
    ios_base::sync_with_stdio(0), cin.tie(NULL);
    int n;
    cin >> n;
    for(int i=0;i<n;i++){
        int a, b;
        cin >> a >> b;
        X.push_back({a, b});
        Y.push_back({b, a});
    }

    sort(X.begin(), X.end());
    sort(Y.begin(), Y.end());
    for(int i=0;i<n;i++){
        swap(Y[i].first, Y[i].second);
    }

    cout << solve(X, Y);
}
