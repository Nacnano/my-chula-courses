#include <stdexcept>
#include <iostream>
#include "pair.h"
#include "student.h"
#include <string>


int main() {
    int fa,fb;
    std::string sa,sb;

    std::cout << "Enter CP::pair<int,string> A: ";
    std::cin >> fa >> sa;
    std::cout << "Enter CP::pair<int,string> B: ";
    std::cin >> fb >> sb;

    CP::pair<int,std::string> a(fa,sa), b(fb,sb);

    std::cout << "Result of a >= b is " << (a >= b) << std::endl;
    std::cout << "Result of b >= a is " << (b >= a) << std::endl;
}
