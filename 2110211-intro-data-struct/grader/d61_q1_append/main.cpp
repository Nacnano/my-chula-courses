#include <iostream>
#include "student.h"
using namespace std;
void test1() {
    CP::stack<int> S;
    CP::queue<int> Q;
    S.push(1);
    S.push(2);
    S.push(3);
    S.push(4);
    S.push(5);
    Q.push(6);
    Q.push(7);
    Q.push(8);
    Q.push(9);
    S.appendQueue(Q);
    S.print();
}

void test2() {
    CP::stack<int> S;
    CP::queue<int> Q;
    S.push(1);
    S.push(2);
    S.push(3);
    S.push(4);
    S.push(5);
    Q.push(6);
    Q.push(7);
    Q.push(8);
    Q.push(9);
    Q.appendStack(S);
    Q.print();
}
void test3() {
    CP::stack<int> S1;
    CP::stack<int> S2;
    S1.push(1);
    S2.push(1);
    S1.appendStack(S2);
    S1.print();
}
void test4() {
    CP::queue<int> Q1;
    CP::queue<int> Q2;
    Q1.push(1);
    Q2.push(1);
    Q1.appendQueue(Q2);
    Q1.print();
}

int main()
{
    test1();
    test2();
    test3();
    test4();
    return 0;
}
