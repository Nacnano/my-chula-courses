#include<bits/stdc++.h>
using namespace std;

map<int, int> mm;

int main(){
    int n;
    cin >> n;
    while(n--){
        int a, b;
        cin >> a >> b;
        mm[a] = max(mm[a], b);
    }

    int st=mm.begin()->first, ed=mm.begin()->second;
    for(auto &it: mm){
        if(ed+1 < it.first){
            cout << st << " " << ed << " ";
            st = it.first;
            ed = it.second;
        }
        else {
            ed = max(ed, it.second);
        }
    }
    cout << st << " " << ed << " ";
}
