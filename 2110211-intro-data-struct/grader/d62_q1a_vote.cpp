#include<bits/stdc++.h>
using namespace std;

map<string, int> mm;
priority_queue<int> pq;

int main(){
    int n, k;
    cin >> n >> k;
    while(n--){
        string s;
        cin >> s;
        if(mm.find(s) == mm.end()) mm[s] = 1;
        else mm[s] += 1;
    }

    for(auto &x: mm){
        pq.push(x.second);
    }

    int ans;
    for(;k && !pq.empty();k--){
        ans = pq.top();
        pq.pop();
    }
    cout << ans;
}
