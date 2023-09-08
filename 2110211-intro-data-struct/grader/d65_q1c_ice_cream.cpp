#include<bits/stdc++.h>
using namespace std;

int mm[100005];
vector<int> qs;

int main(){
	ios_base::sync_with_stdio(false), cin.tie(0);

	int n, m, start;
	cin >> n >> m >> start;
	while(n--){
		int a, s;
		cin >> a >> s;
		mm[a] = s;
	}

	qs.push_back(start);
	for(int i=1;i<=100000;i++){
		if(mm[i]) start = mm[i];
		qs.push_back(*(--qs.end()) + start);
	}

	while(m--){
		int p, x;
		cin >> p >> x;
		auto it = lower_bound(qs.begin(), qs.begin()+x, p);
		if(it-qs.begin() == x && qs[x] < p){
			it = lower_bound(qs.begin()+x, qs.end(),p+qs[x]);
		}
		cout << it-qs.begin() << " ";
	}
}
