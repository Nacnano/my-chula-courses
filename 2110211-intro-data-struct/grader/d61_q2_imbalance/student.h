// Your code here

int process(node* n, KeyT &ans, int &mx){
    if(n == NULL) return -1;

    node* l = n->left;
    node* r = n->right;
    int hr = process(l, ans, mx);
    int hl = process(r, ans, mx);

    int bal = std::abs(hl - hr);
    if(mx < bal){
        mx = bal;
        ans = n->data.first;
    }
    else if(mx == bal && mLess(n->data.first, ans)) {
        ans = n->data.first;
    }

    return 1 + std::max(hl, hr);

}

KeyT getValueOfMostImbalanceNode() {
    KeyT ans = mRoot->data.first;
    int mx = 0;
    process(mRoot, ans, mx);
    return ans;
    // Your code here
}
