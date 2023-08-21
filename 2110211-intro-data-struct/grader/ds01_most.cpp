#include<bits/stdc++.h>
using namespace std;

map<string, int> mm;

int main(){
    int n, mx=0;
    cin >> n;

    string ans;
    while(n--){
        string s;
        cin >> s;
        if(mm.find(s)==mm.end()){
            mm[s] = 1;
        }
        else {
            mm[s] += 1;
        }

        if(mm[s] > mx){
            mx =  mm[s];
            ans = s;
        }
        else if(mm[s] == mx && s>ans){
            ans = s;
        }
    }
    cout << ans << " " << mx;

}
