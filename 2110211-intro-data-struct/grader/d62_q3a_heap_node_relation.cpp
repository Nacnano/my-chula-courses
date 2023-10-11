#include<bits/stdc++.h>
using namespace std;

int main(){
	int n, m;
	cin >> n >> m;
	while(m--){
		int a, b;
		cin >> a >> b;
		if(a == b){
			cout << "a and b are the same node\n";
			continue;
		}

		bool a_is_child = a > b, is_ancester = false;
		if(a > b) swap(a, b);

		while(b > a){
			b = (b - 1) / 2;
			if(b == a) is_ancester = true;
		}

		if(is_ancester){
			if(!a_is_child) cout << "a is an ancestor of b\n";
			else cout << "b is an ancestor of a\n";
		}
		else {
			cout << "a and b are not related\n";
		}

	}
}
