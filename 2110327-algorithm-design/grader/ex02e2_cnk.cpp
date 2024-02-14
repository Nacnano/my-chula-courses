#include<bits/stdc++.h>
using namespace std;

int choose(int n, int k){
    if(n==k || k==0){
        return 1;
    }
    return choose(n-1, k-1)+choose(n-1, k);
}

int main(){

    int n, k;
    cin >> n >> k;
    cout << choose(n, k);
}
