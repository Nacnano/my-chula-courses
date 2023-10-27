void shift(int k){
    int M = (int)mSize;
    k = ( (k % M) + M) % M;
    while(k--){
        mHeader->data = mHeader->next->data;
        mHeader = mHeader->next;
    }
}
