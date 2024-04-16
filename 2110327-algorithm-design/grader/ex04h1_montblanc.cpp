#include<bits/stdc++.h>
using namespace std;
const int maxN = 1e5+5;

int h[maxN];

int main(){

    int n, d;
    cin >> n >> d;
    for(int i=1;i<=n;i++){
        cin >> h[i];
    }
    h[n+1] = 2*1e9;

    int st = 1, ed = 1e9, day_ans;
    while(st < ed){
        int md = (st+ed)/2;

        int day = 0, idx = 0, now = 0;
        while(idx < n){
            if(h[idx+1] - now > md) break;
            while(now + md >= h[idx+1]){
                idx++;
            }
            now = h[idx];
            day++;
        }

        if(day > d || idx < n){
            st = md+1;
        }
        else {
            day_ans = day;
            ed = md;
        }
    }

    cout << ed << " " << day_ans;
}
