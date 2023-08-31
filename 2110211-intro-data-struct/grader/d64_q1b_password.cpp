#include<bits/stdc++.h>
using namespace std;

map<string, bool> mm;
int k[100005];

int main(){
	ios_base::sync_with_stdio(false), cin.tie(0);

	int n, m, l;
	cin >> n >> m >> l;
	for(int i=0;i<l;i++){
	cin >> k[i];
	}

	while(n--){
		string s;
		cin >> s;
		mm[s] = 1;
	}
	while(m--){
		string s, s2;
		cin >> s;
		for(int i=0;s[i];i++){
			s2 += (s[i] + k[i] - 'a')%26 + 'a';
		}
		cout << (mm.find(s2)!=mm.end() ? "Match" : "Unknown") << "\n";
	}
}
