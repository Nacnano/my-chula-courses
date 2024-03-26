#include<bits/stdc++.h>
using namespace std;

int m[1005][1005];

int main(){

    int n, a, b;
    cin >> n >> a >> b;
    m[b][a] = 1;
    while(n--){
        int x, y;
        cin >> x >> y;
        m[y][x] = 2;
    }



}
