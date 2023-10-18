#include<bits/stdc++.h>
using namespace std;

struct node{
	short data;
	node *next;
	node *prev;
};

node *header = new node;

int main(){
	int n, k;
	short v;
	cin >> n >> k >> v;

	node *last = header;
	for(int i=0;i<=n;i++){
		if(i == k){
			node *now = new node;
			now->data = v;
			now->prev = last;
			last->next = now;
			last = now;
			continue;
		}
		int a;
		cin >> a;
		node *now = new node;
		now->data = a;
		now->prev = last;
		last->next = now;
		last = now;
	}
	last->next = header;
	header->prev = last;

	node *it = header;
	while(k--){
		it = it->next;
	}

	node *itl = it, *itr = it->next;
	int value = v;
	while(true){
		int cnt = 0;
		node *tmpitl = itl, *tmpitr = itr;
		while(tmpitl != header && tmpitl->data == value) {
			tmpitl = tmpitl->prev;
			cnt++;
		}
		while(tmpitr != header && tmpitr->data == value) {
			tmpitr = tmpitr->next;
			cnt++;
		}

		if(cnt >= 3 ){
			itr = tmpitr;
			itl = tmpitl;
			if(itl->data != itr->data) break;
			value = itr->data;
		}
		else {
			break;
		}
	}

	node *st = header->next;
	while(st != itl->next){
		cout << st->data << " ";
		st = st->next;
	}

	while(itr != header){
		cout << itr->data << " ";
		itr = itr->next;
	}
}
