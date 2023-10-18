void replace(const T& x, list<T>& y) {
  //write your code here
	iterator it = begin();
	while(it != end()){
		if(*it == x){
			it = erase(it);
			for(auto it2 = y.begin(); it2 != y.end(); it2++)
			insert(it, *it2);
		}
		else it++;
	}
}
