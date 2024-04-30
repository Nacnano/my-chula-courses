#include <bits/stdc++.h>
using namespace std;

struct GRAPH {
    int i, j, w;
    bool operator < (const GRAPH &o) const {
        return w > o.w;
    }
};

const int di[6] = {-1, 0, 1, 1, 0, -1};
const int dj[2][6] = {{0, 1, 0, -1, -1, -1}, {1, 1, 1, 0, -1, 0}};
int dis[310][310];

priority_queue <GRAPH> pq;

int a[310][310];

int main() {
    cin.tie(nullptr)->sync_with_stdio(false);

    int r, c;
    cin >> r >> c;
    int sti, stj, eni, enj;
    cin >> sti >> stj >> eni >> enj;
    for(int i = 1; i <= r; i++) {
        for(int j = 1; j <= c; j++) {
            cin >> a[i][j];
            dis[i][j] = 1e9;
        }
    }
    dis[sti][stj] = a[sti][stj];
    pq.push({sti, stj});
    while(!pq.empty()) {
        int i = pq.top().i;
        int j = pq.top().j;
        int w = pq.top().w;
        pq.pop();
        cout << pq.size() << " " << w << endl;
        if(i == eni && j == enj) {
            cout << dis[i][j];
            return 0;
        }
        for(int k = 0; k < 6; k++) {
            int ii = i + di[k];
            int jj = j + dj[i % 2][k];
            if(ii < 1 || jj < 1 || ii > r || jj > c) {
                continue;
            }
            if(dis[ii][jj] <= dis[i][j] + a[ii][jj]) {
                continue;
            }
            dis[ii][jj] = dis[i][j] + a[ii][jj];
            pq.push({ii, jj, dis[ii][jj]});
        }
    }
    return 0;
}
