#include <iostream>
#include <vector>
using namespace std;

vector<string> punch(vector<string> &v, vector<string>::iterator it,int k)
{
    //write some code here
    //don’t forget to return something

    // int j = distance(v.begin(), it);
    vector<string>::iterator st = it, ed = it;
    for(int i=0;i<k && st!=v.begin();i++) st--;
    for(int i=0;i<k && ed!=v.end();i++) ed++;

    if(ed == v.end()) v.erase(st, ed);
    else v.erase(st, ed + 1);

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
