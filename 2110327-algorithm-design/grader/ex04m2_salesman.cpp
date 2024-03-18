#include<bits/stdc++.h>
using namespace std;

int seq[1005], t[1005], sum = 0;

int main(){

    int n, m;
    cin >> n >> m;
    for(int i=0;i<m;i++){
        cin >> seq[i];
    }
    for(int i=0;i<m;i++){
        cin >> t[i];
        sum += t[i];
    }

    while(n--){
        int a, b;
        cin >> a >> b;
        for(int i=0;i<m;i++){
            if(seq[i] == a){
                cout << sum - t[b] << "\n";
                break;
            }
            else if(seq[i] == b){
                cout << sum - t[a] << "\n";
                break;
            }
        }


    }
}
