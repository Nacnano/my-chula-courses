#include <vector>
#include<set>
using namespace std;

template <typename T>
vector<T> Union(const vector<T>& A, const vector<T>& B) {
    vector<T> v;
    set<int> ss;
    for(auto x: A){
		ss.insert(x);
		v.push_back(x);
    }
    for(auto x: B){
		if(ss.find(x)==ss.end()) v.push_back(x);
    }
    return v;
}

template <typename T>
vector<T> Intersect(const vector<T>& A, const vector<T>& B) {
    vector<T> v;
    set<int> ss;
    for(auto x: B){
		ss.insert(x);
    }
    for(auto x: A){
		if(ss.find(x)!=ss.end()) v.push_back(x);
    }
    return v;
}
