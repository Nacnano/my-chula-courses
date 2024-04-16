#include<bits/stdc++.h>
using namespace std;

int a[100005];

int main(){

    int n, m;
    cin >> n >> m;
    for(int i=0;i<m;i++){
        cin >> a[i];
    }
    sort(a, a+m);

    int i = 0, sum = 0;
    double ans = 0;
    while(i < m%n) sum += a[i++];
    ans = sum;
    while(i < m){
        sum += a[i++];
        if((i)%n == m%n) ans += sum;
    }
    cout << fixed << setprecision(3) << ans / m;
}
