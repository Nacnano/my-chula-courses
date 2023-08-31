#include<bits/stdc++.h>
using namespace std;

vector<int> v;
multiset<int> l, r;

multiset<int>::iterator last(multiset<int> &ss){
	return --ss.end();
}

int main(){
	ios_base::sync_with_stdio(false), cin.tie(0);

	int n, w;
	cin >> n >> w;
	for(int i=0;i<n;i++){
		int x;
		cin >> x;
		v.push_back(x);
	}

	for(int i=0;i<=w;i++){
		l.insert(v[i]);
	}

	for(int i=w+1;i<n+1;i++){
		while(l.size() > r.size()){
			r.insert(*last(l));
			l.erase(last(l));
		}
		while(l.size() < r.size()){
			l.insert(*r.begin());
			r.erase(r.begin());
		}

		cout << *(last(l)) << " ";

		if(l.find(v[i-w-1])!=l.end()) l.erase(l.find(v[i-w-1]));
		else if(r.find(v[i-w-1])!=r.end()) r.erase(r.find(v[i-w-1]));

		l.insert(v[i]);
	}


	return 0;
}

