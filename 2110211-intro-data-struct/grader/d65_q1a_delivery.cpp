#include<bits/stdc++.h>
using namespace std;

queue<int> q[3];
int ask[100005];

int main(){
	int n, m;
	cin >> n >> m;

	for(int i=0;i<m;i++){
		cin >> ask[i];
	}

	vector<int> done, qs;
	while(n--){
		int t;
		cin >> t;
		if(t == 1){
			int a, b;
			cin >> a >> b;
			q[a].push(b);
		}
		else if(t == 2){
			if(q[2].empty()){
				done.push_back(q[1].front());
				q[1].pop();
			}
			else if(q[1].empty()){
				done.push_back(q[2].front());
				q[2].pop();
			}
			else if (q[1].front() < q[2].front()){
				done.push_back(q[1].front());
				q[1].pop();
			}
			else if(q[2].front() < q[1].front()){
				done.push_back(q[2].front());
				q[2].pop();
			}
			else if(q[2].front() == q[1].front()){
				done.push_back(q[1].front());
				q[1].pop();
			}
		}
	}
	qs.push_back(0);
	for(auto &x: done){
		qs.push_back(*(--qs.end()) + x);
	}

	for(int i=0;i<m;i++){
		auto it = lower_bound(qs.begin(), qs.end(), ask[i]);
		cout << (it == qs.end() ? -1 : it - qs.begin()) << " ";
	}
}
