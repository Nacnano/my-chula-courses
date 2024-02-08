#include<bits/stdc++.h>
using namespace std;
string a, b;

bool check(int sta,int stb, int l){
    if(l==1){
        return a[sta]==b[stb];
    }
    l/=2;
    return (check(sta, stb, l) && check(sta+l, stb+l, l)) || (check(sta+l, stb, l) && check(sta, stb+l, l));
}

int main(){
    cin >> a >> b;
    cout << (check(0, 0, a.length()) ? "YES" : "NO");
}
