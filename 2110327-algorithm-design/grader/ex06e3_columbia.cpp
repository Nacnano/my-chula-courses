#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9;

int dist[1005][1005];
int a[1005][1005];
int dx[5] = {0, 0, 1, -1};
int dy[5] = {1, -1, 0, 0};
int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n, m;
    cin >> n >> m;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            cin >> a[i][j];
            dist[i][j] = MAX;
        }
    }

    priority_queue<pair<int, pair<int, int> > > pq;
    pq.push({0, {1, 1} });
    dist[1][1] = 0;
    while(!pq.empty()){
        auto t = pq.top();
        pq.pop();

        int w = -t.first;
        int x = t.second.first;
        int y = t.second.second;

        for(int i=0;i<4;i++){
            int nx = x + dx[i];
            int ny = y + dy[i];

            if(nx < 1 || ny < 1 || nx > m || ny > n) continue;

            if(dist[ny][nx] > dist[y][x] + a[ny][nx]){
                dist[ny][nx] = dist[y][x] + a[ny][nx];
                pq.push({-dist[ny][nx], { nx, ny } });
            }
        }
    }

    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            cout << dist[i][j] << " ";
        }
        cout << "\n";
    }

}
