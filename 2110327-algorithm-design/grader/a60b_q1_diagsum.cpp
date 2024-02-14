#include<iostream>
int a,k[2005],h,i,n,b=-1e9;
int main(){
    std::cin>>n;
    while(i<n*n){
        h=i%n-i++/n+1e3;
        std::cin>>a;
        k[h]+=a;
        b>k[h]?:b=k[h];
        k[h]>0?:k[h]=0;
    }
    std::cout<<b;
