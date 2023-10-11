#include<bits/stdc++.h>
using namespace std;

int main(){
	long long n, m;
	cin >> n >> m;
	if(m == 1) {
		cout << n - 1;
		return 0;
	}

	long long ans = 0, val = 1;
	while(val < n * (m - 1) + 1){
		val *= m;
		ans++;
	}
	cout << ans - 1;
	return 0;
}

/*
Tod Lek
1 + m + m^2 + ... m^ans = (m^(ans + 1) - 1) / (m - 1) >= n
m^ans >= n * (m - 1) + 1

*/
