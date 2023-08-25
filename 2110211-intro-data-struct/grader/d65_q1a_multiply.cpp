#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
void member_multiply(vector<int> &v,
vector<pair<vector<int>::iterator,int>> &multiply) {
//write your code here
    vector<vector<int>::iterator> dup;
    for(auto x: multiply){
        dup.push_back(x.first);
    }
    sort(dup.begin(), dup.end());

    for(vector<int>::iterator itv = v.begin(); itv<v.end(); itv++){
        vector<vector<int>::iterator>::iterator lw = lower_bound(dup.begin(), dup.end(), itv);
        if(*lw != itv) multiply.push_back({itv, 0});
    }

    sort(multiply.begin(), multiply.end());

    vector<int> ans;
    for(auto x: multiply){
        for(int i=0;i<(x.second)+1;i++){
            ans.push_back(*(x.first));
        }
    }
    v = ans;
}
int main() {
ios_base::sync_with_stdio(false);cin.tie(0);
int n,m;
cin >> n >> m;
vector<int> v(n);
vector<pair<vector<int>::iterator,int>> multiply(m);
for (int i = 0;i < n;i++) cin >> v[i];
for (int i = 0;i < m;i++) {
int a,b;
cin >> a >> b;
multiply[i].first = v.begin()+a;
multiply[i].second = b;
}
member_multiply(v,multiply);
cout << "======= result ========" << endl;
cout << v.size() << endl;
for (auto &x : v) {
cout << x << " ";
}
cout << endl;
}
