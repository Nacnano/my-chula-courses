#include<bits/stdc++.h>
using namespace std;

map<string, set<string> > dept;
map<string, string> deptOf;

int main(){
    int n, m;
    cin >> n >> m;
    while(n--){
        string a, b;
        cin >> a >> b;
        dept[b].insert(a);
        deptOf[a] = b;
    }
    while(m--){
        int q;
        string a, b;
        cin >> q >> a >> b;
        if(q == 1){
            string currentDept = deptOf[a];
            dept[currentDept].erase(a);
            dept[b].insert(a);
            deptOf[a] = b;
        }
        else if(q == 2){
            for(auto &x: dept[a]){
                dept[b].insert(x);
                deptOf[x] = b;
            }
            dept.erase(a);
        }
    }
    for(auto &it: dept){
        cout << it.first << ": ";
        for(auto &name: it.second) cout << name << " ";
        cout << "\n";
    }
    return 0;
}
