#include<bits/stdc++.h>
using namespace std;
const int MAX = 1e9;

int n, m, a1, b1, a2, b2;
int a[305][305];

int dro[] = {-1, -1, 1, 1, 0, 0};
int dco[] = {0, 1, 0, 1, 1, -1};

int dre[] = {-1, -1, 1, 1, 0, 0};
int dce[] = {-1, 0, -1, 0, 1, -1};

int dist[305][305];
priority_queue<pair<int, pair<int, int >> > pq;

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n >> m >> a1 >> b1 >> a2 >> b2;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            cin >> a[i][j];
            dist[i][j] = MAX;
        }
    }

    pq.push({-a[a1][b1], {b1, a1}});
    dist[a1][b1] = a[a1][b1];
    while(!pq.empty()){
        auto t = pq.top();
        pq.pop();

        int c = t.second.first;
        int r = t.second.second;

        for(int i=0;i<6;i++){
            int nc, nr;
            if(r % 2 == 1){
                nc = c + dco[i];
                nr = r + dro[i];
            }
            else{
                nc = c + dce[i];
                nr = r + dre[i];
            }

            if(nc < 1 || nr < 1 || nc > m || nr > n) continue;

            if(dist[nr][nc] > dist[r][c] + a[nr][nc]){
                dist[nr][nc] = dist[r][c] + a[nr][nc];
                pq.push({-dist[nr][nc], {nc, nr}});
            }
        }
    }

    cout << dist[a2][b2];
}
