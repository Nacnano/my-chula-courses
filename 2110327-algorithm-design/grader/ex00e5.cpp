#include<bits/stdc++.h>
using namespace std;

int n, m;
bool arr[25];

void solve(int lv){
    if(lv == n){
        int cnt=0;
        bool valid = false;
        for(int i=0;i<n;i++){
            if(arr[i]==0) cnt=0;
            else cnt++;

            if(cnt>=m){
                valid = true;
            }

        }
        if(!valid) return;

        for(int i = 0;i < n;i++){
            cout << arr[i];
        }
        cout << "\n";
        return;
    }

    arr[lv] = 0;
    solve(lv + 1);

    arr[lv] = 1;
    solve(lv + 1);
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);
    cin >> n >> m;

    solve(0);

    return 0;
}


