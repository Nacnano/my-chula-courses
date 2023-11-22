#ifndef __STUDENT_H_
#define __STUDENT_H_

#include "map_bst.h"
#include <queue>;

template <typename KeyT,
          typename MappedT,
          typename CompareT>
void CP::map_bst<KeyT,MappedT,CompareT>::my_recur(node* n,int level,int tmp) {
    if(n == mRoot && tmp == -1){
        mSize = 0;
        delete_all_nodes(mRoot);
        mRoot = NULL;
        return;
    }

    if(n == NULL) return;
    my_recur(n->right, level + 1, tmp);
    my_recur(n->left, level + 1, tmp);


    if(level >= tmp){
        std::queue<node*> q;
        int sz = 0;
        q.push(n);
        while(!q.empty()){
            node* now = q.front();
            q.pop();

            sz++;
            if(now == NULL)continue ;

            if(now->right != NULL) q.push(now->right);
            if(now->left != NULL) q.push(now->left);
        }
        mSize -= sz - 1;
        delete_all_nodes(n->left);
        delete_all_nodes(n->right);
        n->left = NULL;
        n->right = NULL;
    }
}

template <typename KeyT,
          typename MappedT,
          typename CompareT>
void CP::map_bst<KeyT,MappedT,CompareT>::trim(int depth) {
    my_recur(mRoot, 0, depth);
}

#endif
