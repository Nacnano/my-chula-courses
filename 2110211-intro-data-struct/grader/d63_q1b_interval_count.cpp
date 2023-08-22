#include<bits/stdc++.h>
using namespace std;

vector<int> v;

int main(){
    ios_base::sync_with_stdio(false), cin.tie(0);

    int n, m, k;
    cin >> n >> m >> k;
    while(n--){
        int x;
        cin >> x;
        v.push_back(x);
    }

    sort(v.begin(), v.end());

    while(m--){
        int p;
        cin >> p;

        vector<int>::iterator low, up;
        low = lower_bound(v.begin(), v.end(), p-k);
        up = upper_bound(v.begin(), v.end(), p+k);

        cout << up-low << " ";
    }
}
