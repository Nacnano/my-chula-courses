#include<bits/stdc++.h>
using namespace std;

int h[1<<8+5][1<<8+5];

void solve(int a , int b, int stx, int edx, int sty, int edy){
    if(a==0){
        h[sty][stx]=b;
        return;
    }

    int mdx=(stx+edx)/2, mdy=(sty+edy)/2;
    solve(a-1, b, stx, mdx, sty, mdy);
    solve(a-1, b-1, mdx+1, edx, sty , mdy);
    solve(a-1, b+1, stx, mdx, mdy+1, edy);
    solve(a-1, b, mdx+1, edx, mdy+1, edy);
}

int main(){
    int a, b;
    cin >> a >> b;

    solve(a, b, 1, 1<<a, 1, 1<<a);

    for(int i=1;i<=(1<<a);i++){
        for(int j=1;j<=(1<<a);j++){
            cout << h[i][j] << " ";
        }
        cout << "\n";
    }
}
