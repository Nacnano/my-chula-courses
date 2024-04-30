#include<bits/stdc++.h>
using namespace std;

pair<double, pair<double, double> > obj[105];
double ans, W;
int N;

bool comp (pair<double, pair<double, double> > a, pair<double, pair<double, double > > b){
    return a.first > b.first;
}

double possible(int lv, int weight){
    double ret = 0;
    while(lv < N  && weight > 0){
        if(weight >= obj[lv].second.second) {
            ret += obj[lv].second.first;
            weight -= obj[lv].second.second;
        }
        else {
            ret += obj[lv].first * weight;
            break;
        }
        lv++;
    }
    return ret;
}

void solve(int lv, double val, double weight){
    if(weight > W) return;
    ans = max(ans, val);

    if(lv == N+1) return;
    if(val + possible(lv, W-weight) < ans) return;

    solve(lv + 1, val + obj[lv].second.first, weight + obj[lv].second.second);
    solve(lv + 1, val , weight);
}

int main(){

    cin >> W >> N;
    for(int i=0;i<N;i++){
        cin >> obj[i].second.first;
    }
    for(int i=0;i<N;i++){
        cin >> obj[i].second.second;
        obj[i].first = obj[i].second.first / obj[i].second.second;
    }

    sort(obj, obj+N, comp);
    solve(0, 0, 0);

    cout << fixed << setprecision(4) <<  ans;

}
