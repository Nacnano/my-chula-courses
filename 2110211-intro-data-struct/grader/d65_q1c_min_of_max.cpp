#include<bits/stdc++.h>
using namespace std;

int mx[500005], p[500005];
set<pair<int, int> > ss;

int main(){
	ios_base::sync_with_stdio(false), cin.tie(0);

	int n, m;
	cin >> n >> m;
	for(int i=0;i<m;i++) {
		ss.insert({1, i});
		mx[i] = 1;
	}
	for(int i=0;i<n;i++) cin >> p[i];
	for(int i=0;i<n;i++){
		int t;
		cin >> t;
		if(p[i] > mx[t]){
			ss.erase(ss.find({mx[t], t}));
			mx[t] = p[i];
			ss.insert({p[i], t});
		}
		cout << (*ss.begin()).first << " ";
	}
}
