#include<bits/stdc++.h>
using namespace std;

int n, m;
bool used[25];
int before[25];
int arr[25];

void recur(int lv){
    if(lv == n){
        for(int i=0;i<n;i++){
            cout << arr[i] << " ";
        }
        cout << "\n";
        return;
    }

    for(int i = 0;i < n;i++){
        if(used[i]) continue;
        if(before[i] != -1 && !used[before[i]]) continue;

        arr[lv] = i;
        used[i] = 1;
        recur(lv + 1);
        used[i] = 0;
    }
}

int main(){
    ios_base::sync_with_stdio(false); cin.tie(NULL);

    cin >> n >> m;
    for(int i = 0;i < n;i++) before[i] = -1;
    while(m--){
        int a, b;
        cin >> a >> b;
        before[b] = a;
    }

    recur(0);
}
