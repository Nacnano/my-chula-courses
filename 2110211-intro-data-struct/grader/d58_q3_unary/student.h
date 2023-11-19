#ifndef __STUDENT_H__
#define __STUDENT_H__

template <typename KeyT,
          typename MappedT,
          typename CompareT>
size_t CP::map_bst<KeyT,MappedT,CompareT>::process(node* ptr) const {
  //you may write additional code here
  node* l = ptr->left;
  node* r = ptr->right;
  if(l == NULL && r == NULL) return 0;
  if(l != NULL && r != NULL) return process(l) + process(r);
  if(l == NULL) return process(r) + 1;
  if(r == NULL) return process(l) + 1;
}

template <typename KeyT,
          typename MappedT,
          typename CompareT>
size_t CP::map_bst<KeyT,MappedT,CompareT>::count_unary() const {
  //write your code here
  return process(mRoot);
}

#endif
