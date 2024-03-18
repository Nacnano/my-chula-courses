#include<bits/stdc++.h>
using namespace std;

int a[100005];

int main(){

    int n;
    cin >> n;
    for(int i=0;i<n;i++){
        cin >> a[i];
    }
    int first2 = -1, last2 = -1;
    int ans = 0, st = 0, ed = n-1;
    while(st <= ed){
        if(a[st] == 1){
            st++;
        }
        else if(a[ed] == 3){
            ed--;
        }
        else if(a[st] > a[ed]){
            swap(a[st], a[ed]);
            ans++;
        }
        else if (a[ed] == 2 ){
            st++, ed--;
        }
        for(int i=0;i<n;i++){
            cout << a[i] << " ";
        }
        cout << "\n";
    }
    cout << ans;
}
