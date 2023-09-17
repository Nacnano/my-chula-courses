#include <stdio.h>
#include <iostream>
#include <vector>
#include "vector.h"
#include "student.h"

using namespace std;



int main() {
  CP::vector<int> v1,v2;
  //read vector
  int n1,n2,a;
  scanf("%d",&n1);
  v1.resize(n1);
  for (int i = 0;i < n1;i++) {
    scanf("%d",&a);
    v1[i] = a;
  }
  scanf("%d",&n2);
  v2.resize(n2);
  for (int i = 0;i < n2;i++) {
    scanf("%d",&a);
    v2[i] = a;
  }

  //read position
  int po,fi,la;
  scanf("%d %d %d",&po,&fi,&la);
  CP::vector<int>::iterator position,first,last;
  position = v1.begin() + po;
  first = v2.begin() + fi;
  last = v2.begin() + la;

  //call the function
  v1.insert(position,first,last);

  //display result;
  printf("Result\n");
  for (auto &x : v1) {
    printf("%d ",x);
  }
  printf("\n");

  return 0;
}
