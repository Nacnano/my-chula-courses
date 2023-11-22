#include <iostream>
#include "map_bst.h"
#include "student.h"

int main(){
    std::ios_base::sync_with_stdio(false);
	std::cin.tie(NULL);
    CP::map_bst<int,int> m;
    int N, K;
    std::cin >> N >> K;
    for(int i = 0 ; i < N ; i++){
        int x;
        std::cin >> x;
        m[x] = i;
    }
    m.trim(K);
    m.print();
    return 0;

}