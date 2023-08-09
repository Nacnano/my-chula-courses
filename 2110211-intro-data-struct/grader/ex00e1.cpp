#include<bits/stdc++.h>
using namespace std;

string print(int number){
    string ret;
    if(number < 10){
        ret += '0';
    }
    ret += to_string(number);

    return ret;
}

int main(){
    int hour, minute, add;

    cin >> hour >> minute >> add;
    int total_minute = hour * 60 + minute + add;
    cout << print((total_minute / 60) % 24) + " " +  print(total_minute % 60);

    return 0;

 }
