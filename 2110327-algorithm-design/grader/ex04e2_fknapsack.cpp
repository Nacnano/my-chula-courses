#include<bits/stdc++.h>
using namespace std;
const int maxN = 1e5+5;

pair<double, pair<double, double> > a[maxN];
double v[maxN], w[maxN];
int main(){

    double tar;
    int n;
    cin >> tar >> n;
    for(int i=0;i<n;i++){
        cin >> v[i];
    }
    for(int i=0;i<n;i++){
        cin >> w[i];
        a[i] = {v[i]/w[i], {v[i], w[i] }};
    }

    sort(a, a+n);

    double ans = 0.0;
    for(int i=n-1;i>=0;i--){
        if(tar > a[i].second.second){
            ans += a[i].second.first;
            tar -= a[i].second.second;
        }
        else {
            ans += a[i].first*tar;
            break;
        }
    }
    cout << fixed << std::setprecision(4) << ans;
}
