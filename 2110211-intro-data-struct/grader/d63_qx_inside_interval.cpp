#include<bits/stdc++.h>
using namespace std;

map<int, int> mm;

int main(){
	ios_base::sync_with_stdio(false), cin.tie(0);

	int n, m;
	cin >> n >> m;
	while(n--){
		int a, b;
		cin >> a >> b;
		mm[a]=b;
	}

	while(m--){
		int x;
		cin >> x;
		map<int, int>::iterator it = mm.upper_bound(x);
		if(it==mm.end()) it--;
		else if(it->first>x) it--;

		cout << (it->first<=x && x<=it->second ? "1 ": "0 ");
	}
}
