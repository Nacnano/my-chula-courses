#include<bits/stdc++.h>
using namespace std;

int dist[105][105];
char a[105][105];

int dx[5] = {0, 0, 1, -1};
int dy[5] = {1, -1, 0, 0};
int n, m;

void dfs(int x, int y){
    for(int i=0;i<4;i++){
        int nx = x + dx[i];
        int ny = y + dy[i];

        if( nx <=0 || nx > m || ny <=0 || ny > n) continue;
        if(a[ny][nx] == '#') continue;

        if(dist[ny][nx] > dist[y][x] + 1){
            dist[ny][nx] = dist[y][x] + 1;
            dfs(nx, ny);
        }
    }
}

int main(){

    cin >> n >> m;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            cin >> a[i][j];
        }
    }


    for(int i=1;i<=n;i++) for(int j=1;j<=m;j++) dist[i][j] = 1e9;
    dist[1][1] = 0;
    dfs(1, 1);

    cout << ( dist[n][m] == 1e9 ? -1 : dist[n][m]);
}
