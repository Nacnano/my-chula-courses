#include<bits/stdc++.h>
using namespace std;

int l, x, y;

void solve(int x1, int x2,int y1, int y2, int nox, int noy){
    if(x1==x2 || y1==y2){
        return;
    }
    int mdx = (x1+x2)/2;
    int mdy = (y1+y2)/2;
    if(y1 <= noy && noy <= mdy){
        if(x1 <= nox && nox <= mdx){
            solve(x1, mdx, y1, mdy, nox, noy);
            solve(x1, mdx, mdy+1, y2, mdx, mdy+1);
            solve(mdx+1, x2 , y1, mdy, mdx+1, mdy);
            solve(mdx+1, x2, mdy+1, y2, mdx+1, mdy+1);
            cout << 0 << " " << mdx << " " << mdy << "\n";
        }
        else {
            solve(x1, mdx, y1, mdy, mdx, mdy);
            solve(x1, mdx, mdy+1, y2, mdx, mdy+1);
            solve(mdx+1, x2 , y1, mdy, nox, noy);
            solve(mdx+1, x2, mdy+1, y2, mdx+1, mdy+1);
            cout << 1 << " " << mdx << " " << mdy << "\n";
        }
    }
    else {
        if(x1 <= nox && nox <= mdx){
            solve(x1, mdx, y1, mdy, mdx, mdy);
            solve(x1, mdx, mdy+1, y2, nox, noy);
            solve(mdx+1, x2 , y1, mdy, mdx+1, mdy);
            solve(mdx+1, x2, mdy+1, y2, mdx+1, mdy+1);
            cout << 2 << " " << mdx << " " << mdy << "\n";
        }
        else {
            solve(x1, mdx, y1, mdy, mdx, mdy);
            solve(x1, mdx, mdy+1, y2, mdx, mdy+1);
            solve(mdx+1, x2 , y1, mdy, mdx+1, mdy);
            solve(mdx+1, x2, mdy+1, y2, nox, noy);
            cout << 3 << " " << mdx << " " << mdy << "\n";
        }

    }
}

int main(){

    cin >> l >> x >> y;
    cout << l*l/3 << "\n";
    solve(0, l-1, 0, l-1, x, y);
}
