#include<bits/stdc++.h>
using namespace std;

map<string, int> mm;
priority_queue<int> pq;

int main(){
    int n;
    cin >> n;
    while(n--){
        string s;
        cin >> s;
        if(mm.find(s) == mm.end()) mm[s] = 1;
        else mm[s] += 1;
    }

    for(auto &x: mm){
        if(x.second<=1) continue;
        cout << x.first << " " << x.second << "\n";
    }
}
