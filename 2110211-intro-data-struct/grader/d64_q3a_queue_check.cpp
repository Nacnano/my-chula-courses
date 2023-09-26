#include<bits/stdc++.h>
using namespace std;
const int mul = 50;

int main(){

	int n, mFront , mSize, mCap, last, correction;
	cin >> n;
	while(n--){
		cin >> mFront >> mSize >> mCap >> last >> correction;

		if(mCap && mCap > mFront && mCap >= mSize && last < mCap &&  last == (mFront + mSize) % mCap){
			cout << "OK\n";
		}
		else{
			cout << "WRONG ";
			if(correction == 1){
				cout << (last - mSize + mul*mCap) % mCap;
			}
			else if(correction == 2){
				cout << (last - mFront + mul*mCap) % mCap;
			}
			else if(correction == 3){
				if(mFront < last){
					cout << last + 1;
				}
				else {
					cout << mFront + mSize - last;
				}
			}
			else if(correction == 4){
				cout << (mFront + mSize) % mCap;
			}
			cout << "\n";
		}
	}
}
