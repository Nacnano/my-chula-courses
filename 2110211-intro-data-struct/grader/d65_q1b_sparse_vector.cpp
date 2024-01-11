#include <iostream>
#include <vector>
#include <map>
using namespace std;
void insert_into_sv(map<int,int> &v, int pos, int value) {
 //your code here
	auto it = v.lower_bound(pos);

	vector<pair<int, int> > tmp;
	for(auto i = it;i != v.end();i++){
		tmp.push_back({i->first + 1, i->second});
	}

	v.erase(it, v.end());
	v[pos] = value;
	for(auto it2: tmp){
        v.insert(v.end(), it2);
	}
}
int main() {
 ios_base::sync_with_stdio(false);cin.tie(0);
 int n;
 map<int,int> v;
 cin >> n;
 for (int i = 0;i < n;i++) {
 int a,b;
 cin >> a >> b;
 insert_into_sv(v,a,b);
 }
 cout << v.size() << "\n";
 for (auto &x : v) {
 cout << x.first << ": " << x.second << "\n";
 }
}
