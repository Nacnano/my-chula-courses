#include<bits/stdc++.h>
using namespace std;

int main(){

	vector<pair<int, int> > v;
	pair<pair<int, int> , pair<int, int> > p1 = {{1, 2}, {3, 4}};
	pair<int, int> p2 = make_pair(1, 2);

	v.push_back(p2);
	// v.push_back(p2);

	for(auto x:v){
		cout << x.first << "\n";
	}

	return 0;
}
