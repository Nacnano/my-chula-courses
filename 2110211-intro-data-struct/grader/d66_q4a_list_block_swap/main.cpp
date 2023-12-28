#include "list.h"
#include "student.h"
#include <iostream>

using std::cin;
using std::cout;

int main(){
	std::ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	
	int N, i1, i2, j1, j2, numberToInsert;
	cin >> N >> i1 >> i2 >> j1 >> j2;

	CP::list<int > l;
	for(int i=0;i<N;i++){
		int numberToInsert;
		cin >> numberToInsert;
		l.push_back(numberToInsert);
	}

	CP::list<int >::iterator it, a1, a2, b1, b2;
	it = l.begin();
	for(int i=0;i<=N;i++){
		if(i == i1)	a1 = it;
		if(i == i2)	a2 = it;
		if(i == j1)	b1 = it;
		if(i == j2)	b2 = it;
		it++;
	}

	l.block_swap(a1, a2, b1, b2);

	l.print();
}