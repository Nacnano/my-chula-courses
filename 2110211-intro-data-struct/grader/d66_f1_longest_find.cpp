
#include<bits/stdc++.h>
using namespace std;

pair<int, int> hsh[2010];
int n, m, ans1, ans2;

int get_pos(int a){
    return a % n;
}

int main(){
    cin >> n >> m;
    while(m--){
        int a, b;
        cin >> a >> b;
        int pos = get_pos(b);
        if(a == 1){
            int j = 0;
            while(true){
                int new_pos = get_pos(pos + j*j);
                if(hsh[new_pos].first < 2){
                    hsh[new_pos] = {2, b};
                    break;
                }
                j++;
            }

        }
        else if(a == 2){
            int j = 0, cnt = 0, new_pos;
            while(true){
                int new_pos = get_pos(pos + j*j);
                if(hsh[new_pos].first == 0) {
                    break;
                }
                if(hsh[new_pos].second == b){
                    hsh[new_pos] = {1, 0};
                    break;
                }
                j++;
            }
        }
    }

    for(int i=0;i<n;i++){
        int pos = get_pos(i);

        int j = 0;
        while(true){
            int new_pos = get_pos(pos + j*j);
            if(hsh[new_pos].first < 2) {
                break;
            }
            j++;
        }
        ans1 = max(ans1, j + 1);

        j = 0;
        int cnt=0;
        while(true){
            int new_pos = get_pos(pos + j*j);
            if(hsh[new_pos].first == 0) {
                break;
            }
            j++;
        }
        ans2 = max(ans2, j + 1);
    }
    cout << ans1 << " " << ans2;
}
