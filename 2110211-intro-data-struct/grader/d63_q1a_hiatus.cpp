#include<bits/stdc++.h>
using namespace std;

vector<pair<int, int> > v;
vector<pair<int, int> >::iterator it;

int main(){
	ios_base::sync_with_stdio(false), cin.tie(0);

	int n, m;
	cin >> n >> m;
	while(n--){
		int y, m;
		cin >> y >> m;
		v.push_back({y, m});
	}

	sort(v.begin(), v.end());

	while(m--){
		int y, m;
		cin >> y >> m;
		pair<int, int> num = {y, m};
		it = lower_bound(v.begin(), v.end(), num);

		if(num < v.front()){
			cout << "-1 -1 ";
		}
		else if(*it==num){
			cout << "0 0 ";
		}
		else {
			it--;
 			cout << (*it).first << " " << (*it).second << " ";
		}

	}
}
