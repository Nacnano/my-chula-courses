#include <iostream>
#include <vector>
using namespace std;
int relation(long long S, long long a, long long b) {
	if(a < b) swap(a, b);
	if((a - 1) / S == b) return 1;

	int h1 = 0, h2 = 0;
	while(a > b){
		a = (a - 1) / S;
		h1++;
	}
	if(h1 && a == b) return 2;

	while(a){
		a = (a - 1) / S, h1++;
	}
	while(b){
		b = (b - 1) / S, h2++;
	}
	if(h1 != h2) return 3;
	return 4;
}
int main() {
 ios_base::sync_with_stdio(false); cin.tie(0);
 int n;
 long long S,a,b;
 cin >> n;
 while (n--) {
 cin >> S >> a >> b;
 cout << relation(S,a,b) << " ";
 }
 cout << endl;
}
