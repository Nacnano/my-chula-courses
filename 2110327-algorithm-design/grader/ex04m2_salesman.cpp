#include<bits/stdc++.h>
using namespace std;

int n, m;
int seq[1005], t[1005], sum = 0;

int dist(int a, int b){
    if(a > b) swap(a, b);
    return min(t[b-1] - t[a-1], t[m] - t[b-1] + t[a-1]);
}

int main(){

    cin >> n >> m;
    for(int i=0;i<m;i++){
        cin >> seq[i];
        seq[i]++;
    }
    seq[m] = seq[0];

    for(int i=1;i<=m;i++){
        cin >> t[i];
        t[i] += t[i-1];
    }

    for(int i=0;i<n;i++){
        int a, b;
        cin >> a >> b;

        a++, b++;
        int ans = 0;
        for(int j=1;j<=m;j++){
            ans += min({dist(seq[j-1], seq[j]), dist(seq[j-1], a) + dist(b, seq[j]), dist(seq[j-1], b) + dist(a, seq[j])});
        }
        cout << ans << "\n";
    }
}
