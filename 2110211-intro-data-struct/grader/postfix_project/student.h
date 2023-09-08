#ifndef __STUDENT_H__
#define __STUDENT_H__
#include <vector>

using namespace std;

int eval_postfix(vector<pair<int,int> > v) {
  //WRITE YOUR CODE HERE
  //DON"T FORGET TO RETURN THE RESULT
  stack<int> stk;

  for(auto &x: v){
	if(x.first){
		stk.push(x.second);
	}
	else {
		int b = stk.top();
		stk.pop();
		int a = stk.top();
		stk.pop();

		int val, op = x.second;
		if(op == 0){
			val = a + b;
		}
		else if(op == 1){
			val = a - b;
		}
		else if(op == 2){
			val = a * b;
		}
		else if(op == 3){
			val = a / b;
		}
		stk.push(val);
	}
  }
	return stk.top();
}

#endif
