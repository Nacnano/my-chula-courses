#ifndef __STUDENT_H__
#define __STUDENT_H__

#include <algorithm>
#include <vector>
#include "map_bst.h"

template <typename KeyT,typename MappedT, typename CompareT >
size_t CP::map_bst<KeyT,MappedT,CompareT>::process(node* n) {
  //write your code here
  if(n == NULL) return 0;
  node* l = n->left;
  node* r = n->right;
  if(l == NULL && r == NULL) return 1;
  if(l == NULL) return process(r) + 1;
  if(r == NULL) return process(l) + 1;
  return process(l) + process(r) + 1;
}

template <typename KeyT,typename MappedT, typename CompareT >
std::pair<KeyT,MappedT> CP::map_bst<KeyT,MappedT,CompareT>::subtree(map_bst<KeyT,MappedT,CompareT> &left,
                                                                    map_bst<KeyT,MappedT,CompareT> &right) {
  //write your code here
  if(mRoot == NULL) return std::pair<KeyT,MappedT>();
  left.mRoot = mRoot->left;
  right.mRoot = mRoot->right;


  left.mSize = process(left.mRoot);
  right.mSize = process(right.mRoot);

  mRoot->left= NULL;
  mRoot->right = NULL;
  mSize = 1;
  return mRoot->data;
}

#endif

