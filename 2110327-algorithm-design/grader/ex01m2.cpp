#include<bits/stdc++.h>
using namespace std;

int n, cnt = 0;
vector<int> tmp(1e5+5);
vector<int> v(1e5+5);

void merge(int st, int md, int ed){
    int itl = st, itr = md + 1;
    for(int i = st;i <= ed;i++){
        if(itr > ed) {
            tmp[i] = v[itl++];
        }
        else if(itl > md){
            tmp[i] = v[itr++];
        }
        else if(v[itl] <= v[itr]){
            tmp[i] = v[itl++];
        }
        else {
            cnt += md - itl + 1;
            tmp[i] = v[itr++];
        }
    }
    for(int i = st;i <= ed;i++) v[i] = tmp[i];
}

void merge_sort(int st, int ed){
    if(st >= ed) return;
    int md = (st + ed) >> 1;
    merge_sort(st, md);
    merge_sort(md + 1, ed);
    merge(st, md, ed);
}

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    cin >> n;
    for(int i = 0;i < n;i++){
        cin >> v[i];
    }

    merge_sort(0, n - 1);
    cout << cnt;

    return 0;
}
