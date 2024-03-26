#include<bits/stdc++.h>
using namespace std;

int a[505][505];
int used[505][505];
queue<pair<int, pair<int, int> > > q;

int dx[5] = {0, 0, 1, -1};
int dy[5] = {1, -1, 0, 0};

int main(){

    int n, m, t;
    cin >> n >> m >> t;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            cin >> a[i][j];
            if(a[i][j] == 1){
                q.push({0, {j, i} });
            }
        }
    }

    int ans = 0;
    while(!q.empty()){
        auto p = q.front();
        q.pop();

        int now = p.first;
        if(now > t){
            continue;
        }

        int x = p.second.first, y = p.second.second;
        if(used[y][x]) continue;
        ans++;
        used[y][x] = 1;

        for(int i=0;i<4;i++){
            int nx = x + dx[i];
            int ny = y + dy[i];

            if(nx < 1 || ny < 1 || nx > m || ny > n) continue;
            if(a[ny][nx] == 2) continue;

            q.push({now + 1, {nx, ny}});
        }
    }

    cout << ans;

}

