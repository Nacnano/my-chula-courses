
#include<bits/stdc++.h>
using namespace std;
int m,n,ans=0;
vector<int> power;
vector<int> patt;

bool check(vector<bool> &get,int len){
    if(len<m-1){
        return true;
    }
    for(int i=0;i<m;i++){
        if(!(get[len-i]==patt[m-i-1])){
            return true;
        }
    }
    return false;
}

void letsgo(int len,vector<bool> &get,int sum,int last){
    if(len<n){
        get[len]=1;
        if(check(get,len) && last!=1){
            letsgo(len+1,get,sum+power[len],1);
        }
        get[len]=0;
        if(check(get,len)){
            letsgo(len+1,get,sum,0);
        }
    }
    else{
        if(check(get,n-1)) ans=max(ans,sum);
    }
}

int main(){
    ios_base::sync_with_stdio(false);cin.tie(0);
    cin>>n>>m;
    power.resize(n);
    for(int i=0;i<n;i++){
        cin>>power[i];
    }
    patt.resize(m);
    for(int i=0;i<m;i++){
        cin>>patt[i];
    }
    vector<bool> get(n);
    letsgo(0,get,0,-1);
    cout<<ans;
    return 0;
}


