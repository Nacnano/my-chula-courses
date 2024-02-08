#include<bits/stdc++.h>
using namespace std;

int n, del=1, ans;

void solve(int x){
    cout << del << " " << x <<"\n";
    if(del >= x){
        ans += x/del;
        x%=del;
        del/=10;
        solve(x);
    }
    else{
        if(del == 1){
            ans += x;
        }
        else {
            del/=10;
            solve(x);
        }
    }
}


int main(){

    cin >> n;
    while(del < n){
        del*=10;
        del+=1;
    }
    solve(n);
    cout << ans;
}
