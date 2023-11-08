#include <iostream>
#include "map_bst.h"
using namespace std;

int main()
{
    CP::map_bst<int, int> m;
    m[50] = 1;
    m[17] = 1;
    m[76] = 1;
    m[9] = 1;
    m[23] = 1;
    m[54] = 1;
    m[14] = 1;
    m[19] = 1;
    m[72] = 1;
    m[12] = 1;
    m[67] = 1;
    m.print();
    std::cout<<m.getValueOfMostImbalanceNode()<<endl;
    return 0;
}
