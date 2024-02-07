#include<bits/stdc++.h>
using namespace std;

long long p, k, a, b;
vector<long long> v;

long long solve(long long st, long long ed){
    long long cnt = upper_bound(v.begin(), v.end(), ed) - v.begin() - (lower_bound(v.begin(), v.end(), st) - v.begin());

    if(cnt == 0){
        return a;
    }
    long long cost = b * cnt * (ed - st + 1);
    if(st==ed){
        return cost;
    }

    long long md = (st+ed)/2;
    return min(cost, solve(st, md) + solve(md+1, ed));
}

int main(){
    cin >> p >> k >> a >> b;
    for(int i=0;i<k;i++){
        long long x;
        cin >> x;
        v.push_back(x);
    }
    sort(v.begin(), v.end());
    cout << solve(1, 1<<p);
}
