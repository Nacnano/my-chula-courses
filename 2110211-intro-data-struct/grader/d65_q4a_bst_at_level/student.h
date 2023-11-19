#ifndef __STUDENT_H_
#define __STUDENT_H_

#include <algorithm>
#include <iostream>

// you can modify and use this function
template <typename KeyT,
          typename MappedT,
          typename CompareT>
void CP::map_bst<KeyT,MappedT,CompareT>::my_recur(node* n,size_t level,size_t tmp,std::vector<KeyT> &v) {
  //you MAY need to use this function
  if(n == NULL) return;
  if(level == tmp) {
    v.push_back((n->data).first);
    return;
  }

  node* l = n->left;
  node* r = n->right;
  if(r != NULL) my_recur(r, level, tmp + 1, v);
  if(l != NULL) my_recur(l, level, tmp + 1, v);
  return;
}

template <typename KeyT,
          typename MappedT,
          typename CompareT>
std::vector<KeyT> CP::map_bst<KeyT,MappedT,CompareT>::at_level(size_t level) {
  //write your code here
    std::vector<KeyT> ret;
    my_recur(mRoot, level, 0, ret);
    return ret;
}


#endif
