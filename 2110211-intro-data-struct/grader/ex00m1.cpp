#include<bits/stdc++.h>
using namespace std;

priority_queue<pair<int,int> > pq;
int t[(int)1e6+5];

int main(){

	int n, m;
	cin >> n >> m;
	for(int i=0;i<n;i++){
		cin >> t[i];
	}

	for(int i=0;i<min(n, m);i++){
		pq.push({-t[i], t[i]});
		cout << "0\n";
	}

	for(int i=n;i<m;i++){
		auto x = pq.top();
		pq.pop();
		cout << -x.first << "\n";
		pq.push({x.first-x.second,x.second});
	}
}
