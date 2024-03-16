#include<bits/stdc++.h>
using namespace std;

int n;
pair<int, int> a[100005];

int main(){

    cin >> n;
    for(int i=0;i<n;i++){
        cin >> a[i].second;
    }
    for(int i=0;i<n;i++){
        cin >> a[i].first;
    }
    sort(a, a+n);


    int ed = a[0].first, ans = 1;
    for(int i=1;i<n;i++){
        if(a[i].second >= ed){
            ed = a[i].first;
            ans++;
        }
    }
    cout << ans;
}
