#include<bits/stdc++.h>
using namespace std;
const int maxN = 1e6+5;

int cnt[maxN];
map<pair<int, int>, int> mm;
priority_queue<pair<int, int> > pq[maxN];
vector<int> ans[maxN];


int main(){
	int n, m, a;
	cin >> n >> m >> a;
	for(int i=1;i<=n;i++){
		cin >> cnt[i];
	}

	while(a--){
		char q;
		int u, i, v;
		cin >> q;
		if(q == 'B'){
			cin >> u >> i >> v;
			mm[{u, i}] = v;
		}
		else if(q == 'W'){
			cin >> u >> i;
			mm.erase({u, i});
		}
	}

	for(auto it: mm){
		pq[it.first.second].push({it.second, it.first.first});
	}

	for(int i=1;i<=n;i++){
		while(!pq[i].empty() && cnt[i]>0){
			ans[pq[i].top().second].push_back(i);
			pq[i].pop();
			cnt[i]--;
		}
	}

	for(int i=1;i<=m;i++){
		if(ans[i].size()){
			for(auto x: ans[i]){
				cout << x << " ";
			}
		}
		else {
			cout << "NONE";
		}
		cout << "\n";
	}
}
