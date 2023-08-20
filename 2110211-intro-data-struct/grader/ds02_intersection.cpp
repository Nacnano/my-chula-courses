#include<bits/stdc++.h>
using namespace std;

vector<int> v1, v2;

int main(){

    int n, m;
    cin >> n >> m;

    for(int i=0;i<n;i++){
        int a;
        cin >> a;
        v1.push_back(a);
    }

    for(int i=0;i<m;i++){
        int a;
        cin >> a;
        v2.push_back(a);
    }

    sort(v1.begin(), v1.end());
    sort(v2.begin(), v2.end());

    vector<int>::iterator it1=v1.begin(),it2=v2.begin();

    vector<int> ans;
    while(it1<v1.end(), it2<v2.end()){
        if(!ans.empty()){
            if(*it1 == ans.back()){
                it1++;
                continue;
            }
            if(*it2 == ans.back()){
                it2++;
                continue;
            }
        }
        if(*it1 < *it2){
            it1++;
        }
        if(*it2 < *it1){
            it2++;
        }

        if(*it1 == *it2){
            ans.push_back(*it1);
            it1++, it2++;
        }
    }

    for(auto &x: ans){
        cout << x << " ";
    }
}
