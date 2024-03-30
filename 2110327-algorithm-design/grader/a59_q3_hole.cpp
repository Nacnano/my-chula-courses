#include<bits/stdc++.h>
using namespace std;

int m[1005][1005];
int dist[1005][1005];
priority_queue<pair<int, pair<int, int> > > pq;

int dx[5] = {0, 0, 1, -1};
int dy[5] = {1, -1, 0, 0};

int main(){

    int n, a, b;
    cin >> n >> a >> b;
    while(n--){
        int x, y;
        cin >> x >> y;
        m[y][x] = 1;
    }

    for(int i=0;i<=1000;i++) for(int j=0;j<=1000;j++) dist[i][j] = 1e9;

    int ans = 1e9;
    pq.push({0, {a, b}});
    dist[b][a] = 0;
    while(!pq.empty()){
        auto t = pq.top();
        pq.pop();

        int x = t.second.first;
        int y = t.second.second;
        for(int i=0;i<4;i++){
            int nx = x + dx[i];
            int ny = y + dy[i];

            if(nx < 1 || ny < 1 || nx > 1000 || ny > 1000) {
                ans = min(ans, dist[y][x]);
                continue;
            }

            if(dist[ny][nx] > dist[y][x] + m[ny][nx]){
                dist[ny][nx] = dist[y][x] + m[ny][nx];
                pq.push({-dist[ny][nx], {nx, ny} });
            }
        }
    }

    cout << ans;
}
