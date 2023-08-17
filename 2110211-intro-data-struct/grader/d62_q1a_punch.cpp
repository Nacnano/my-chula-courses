#include <iostream>
#include <vector>
using namespace std;

vector<string> punch(vector<string> &v, vector<string>::iterator it,int k)
{
    //write some code here
    //don’t forget to return something

    // int j = distance(v.begin(), it);
    int j = it - v.begin();
    for(int i = 0; i < k && it != v.end(); i++){
        it++;
    }

    int del = min((int)v.size() - 1, j + k) - j + k + 1;

    while(del-- && !v.empty()){
        v.erase(it);
        if(it == v.begin()){
            break;
        }
        it--;
    }

    return v;
}

int main()
{
    int n,j,k;
    cin >> n >> j >> k;
    vector<string> v(n);
    for (int i = 0; i < n; i++){
        cin >> v[i];
    }

    cout << "Result after punch" << endl;
    vector<string> result = punch(v, v.begin() + j, k);
    for (auto &x : result){
        cout << x << endl;
    }
}
