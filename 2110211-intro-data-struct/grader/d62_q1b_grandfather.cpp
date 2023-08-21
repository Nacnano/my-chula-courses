#include<bits/stdc++.h>
using namespace std;

map<string, string> p;

bool notinp(string x){
    return p.find(x) == p.end();
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(0);

    int n, m;
    cin >> n >> m;
    while(n--){
        string f, s;
        cin >> f >> s;
        p[s] = f;
    }


    while(m--){
        string a, b;
        cin >> a >> b;
        if(a==b || p[p[a]]!=p[p[b]] || p[a]=="" || p[b]=="" || p[p[a]]=="" || p[p[b]]==""){
            cout << "NO\n";
        }
        else {
            cout << "YES\n";
        }

    }
}
