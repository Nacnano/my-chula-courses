#include<bits/stdc++.h>
using namespace std;

long long n, cap = 1, sz;

int main(){

    cin >> n;
    while(n--){
        long long q, a;
        cin >> q >> a;
        if(q == 0){
            while(sz + a > cap){
                cap *= 2;
            }
            sz += a;
        }
        else {
            sz -= a;
        }
    }

    cout << cap - sz;
}
