#include<bits/stdc++.h>
using namespace std;

priority_queue<pair<int ,pair<int , int > > > pq;
int ans[5005], p[5005];

int _find(int x){
    if(p[x] == x) return x;
    else return p[x] = _find(p[x]);
}

int main(){
    int n, m, q;
    cin >> n >> m >> q;
    while(m--){
        int a, b, c;
        cin >> a >> b >> c;
        pq.push({-c, {a, b}});
    }

    for(int i=0;i<n;i++) {
        p[i] = i;
        ans[i] = 1e9;
    }

    int now = n;
    while(!pq.empty()){
        auto t = pq.top();
        pq.pop();

        int c = -t.first;
        int a = t.second.first;
        int b= t.second.second;

        int pa = _find(a);
        int pb = _find(b);


        if(pa != pb){
            now--;
            p[pa] = pb;
        }

        ans[now] = min(ans[now], c);


    }
    while(q--){
        int d;
        cin >> d;
        cout << ans[d] << "\n";
    }

}
