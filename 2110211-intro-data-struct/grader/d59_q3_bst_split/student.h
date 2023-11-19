#ifndef __STUDENT_H_
#define __STUDENT_H_

template <typename KeyT,
          typename MappedT,
          typename CompareT >
CP::map_bst<KeyT,MappedT,CompareT> CP::map_bst<KeyT,MappedT,CompareT>::split(KeyT val) {
  //your code here
  CP::map_bst<KeyT,MappedT,CompareT> result;

  bool old = 0;
  node* ptr = mRoot;
  node* left = NULL;
  node* right = NULL;
  while(ptr != NULL){
    if(old == 0){
            if(compare(val, ptr->data.first) <= 0){
                left = ptr->parent;
                child_link(left, val) = NULL;
                result.child_link(right, val) = ptr;
                ptr->parent = right;
                ptr = ptr->left;
                old = 1;
            }
            else{
                ptr = ptr->right;
            }
    }
    else {
        if(compare(val, ptr->data.first) > 0){
            right = ptr->parent;
            if(right != NULL) right->left = NULL;
            child_link(left, val) = ptr;
            ptr->parent = left;
            ptr = ptr->right;
            old = 0;
        }
        else {
            ptr = ptr->left;
        }
    }
  }

  return result;
}

#endif
