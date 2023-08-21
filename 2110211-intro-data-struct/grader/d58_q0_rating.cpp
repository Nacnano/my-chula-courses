#include<bits/stdc++.h>
using namespace std;

map<string, vector<double> > mc, mt;

void update(map<string, vector<double> >& mm, string key, double s){
    if(mm.find(key) == mm.end()) mm[key] = vector<double>();
    mm[key].push_back(s);
}

void calc(map<string, vector<double>> &mm){
    for(auto &x: mm){
        double sum=0;
        for(auto &y: x.second)
            sum += y;
        cout << x.first << " " << fixed << setprecision(2)<< sum/x.second.size() << "\n";
    }
}

int main(){
    int n;
    cin >> n;
    while(n--){
        string c, t;
        double s;
        cin >> c >> t >> s;
        update(mc, c, s);
        update(mt, t, s);
    }

    calc(mc);
    calc(mt);
}
