#include<iostream>
#include<vector>
using namespace std;

vector<int> v;

int main(){
    ios_base::sync_with_stdio(false), cin.tie(NULL);

    int n, m;
    cin >> n >> m;

    for(int i = 0;i < n;i++){
        int a;
        cin >> a;
        v.push_back(a);
    }

    while(m--){
        int sum, have = 0;
        cin >> sum;
        for(int i = 0;i < n && !have;i++){
            int  l = i + 1, r = n - 1;
            while(l < r){
                int current = v[i] + v[l] + v[r];
                if(current < sum){
                    l++;
                }
                else if(current > sum){
                    r--;
                }
                else {
                    have = 1;
                    break;
                }
            }
        }
        cout << (have ? "YES\n" : "NO\n");
    }

    return 0;
}
