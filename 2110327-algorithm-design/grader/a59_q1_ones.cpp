#include<bits/stdc++.h>
using namespace std;

int n, del=1, ans, len=1;

int solve(int x, int del, int len){
    if(x < 11){
        return min(13-x, x);
    }

    return min(solve(x%del, del/10, len-1) + x/del*len, solve(del-x%del, del/10, len-1) + (x/del+1)*len );
}

int main(){
    cin >> n;
    while(del < n){
        del*=10;
        del+=1;
        len++;
    }
    cout << min(solve(n, del, len), solve(del-n, del, len) + len);
}
