#include<bits/stdc++.h>
using namespace std;

int main(){
	int n, m, idx = 0;
	cin >> n >> m;
	vector<int> v, ans;
	v.push_back(m);
	for(;idx < v.size() && v.back() < n;idx++){
		for(int j = 1;j <= 2;j++){
			v.push_back(2 * v[idx] + j);
		}
	}
	for(auto &x: v){
		if(x >= n) break;
		ans.push_back(x);
	}
	cout << ans.size() << "\n";
	for(auto &x: ans){
		cout << x << " ";
	}
}
