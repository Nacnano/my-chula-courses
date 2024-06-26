void splitList(list<T>& list1, list<T>& list2) {
    // Add your code here
    int cnt1 = (mSize + 1) / 2;
    iterator it = mHeader->next;
	while(cnt1--) it++;
	list1.mHeader->prev->next = mHeader->next;
	mHeader->next->prev = list1.mHeader->prev;

	list1.mHeader->prev = it.ptr->prev;
	it.ptr->prev->next = list1.mHeader;

	list2.mHeader->prev->next = it.ptr;
	it.ptr->prev = list2.mHeader->prev;

	list2.mHeader->prev = mHeader->prev;
	mHeader->prev->next = list2.mHeader;

	mHeader->next = mHeader;
	mHeader->prev = mHeader;

	list1.mSize += (mSize + 1) / 2;
	list2.mSize += mSize / 2;
	mSize = 0;
}
