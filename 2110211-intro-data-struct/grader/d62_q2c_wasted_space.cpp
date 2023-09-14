#include<bits/stdc++.h>
using namespace std;

int main(){
	int n;
	cin >> n;

	int cap = 1;
	while(cap < n){
		cap *= 2;
	}
	cout << cap - n;
}
