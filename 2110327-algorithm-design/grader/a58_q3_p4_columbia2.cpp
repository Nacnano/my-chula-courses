#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9;

int n, m;
int dist[3][1005][1005];
int a[1005][1005];
int dx[5] = {0, 0, 1, -1, 0};
int dy[5] = {1, -1, 0, 0, 0};

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n >> m;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            cin >> a[i][j];
            for(int k=0;k<3;k++) dist[k][i][j] = MAX;
        }
    }

    priority_queue<pair<int, pair<int, int> > > pq;
    pq.push({0, {1, 1} });
    dist[0][1][1] = 0;
    while(!pq.empty()){
        auto t = pq.top();
        pq.pop();

        int x = t.second.first;
        int y = t.second.second;

        for(int i=0;i<4;i++){
            int nx = x + dx[i];
            int ny = y + dy[i];

            if(nx < 1 || ny < 1 || nx > m || ny > n) continue;

            for(int tear=0;tear<3;tear++){
                if(dist[tear][ny][nx] > dist[tear][y][x] + a[ny][nx]){
                    dist[tear][ny][nx] = dist[tear][y][x] + a[ny][nx];
                    pq.push({-dist[tear][ny][nx], { nx, ny } });
                }
            }



            for(int j=0;j<5;j++){
                int nnx = nx + dx[j];
                int nny = ny + dy[j];

                if(nnx < 1 || nny < 1 || nnx > m || nny > n) continue;

                for(int tear=0;tear<=1;tear++){
                    if(dist[tear+1][nny][nnx] > dist[tear][y][x]){
                        dist[tear+1][nny][nnx] = dist[tear][y][x];
                        pq.push({-dist[tear+1][nny][nnx], { nnx, nny } });
                    }
                }
            }
        }
    }


    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            int ans = MAX;
            for(int k=0;k<=2;k++){
                ans = min(ans, dist[k][i][j]);
            }
            cout << ans << " ";
        }
        cout << "\n";
    }

}
