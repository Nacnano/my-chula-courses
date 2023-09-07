#include<bits/stdc++.h>
using namespace std;

bool cmp(const array<int, 3> a, const array<int, 3> b){
	return a[0] < b[0];
}

bool cmp_v(const vector<int> a, const vector<int> b){
	return a[0] < b[0];
}

int main(){
	int a[5][5] = {{10, 20, 30}, {5, 1, 7}, {11, 2, 3}};
	vector<vector<int> > v;
	vector<int> v1{10, 20, 30};
	vector<int> v2{5, 1, 7};
	vector<int> v3{11, 2, 3};
	v.push_back(v1);
	v.push_back(v2);
	v.push_back(v3);

	// Array Method
	/*sort(a, a+3, cmp);
	for(int i=0;i<3;i++){
		for(int j=0;j<3;j++){
			cout << a[i][j] << " ";
		}
		cout << "\n";
	}
	*/

	// Vector Method
	sort(v.begin(), v.begin()+3);
	for(int i=0;i<3;i++){
		for(auto &x: v[i])
			cout << x << " ";
			cout << "\n";
	}
}
