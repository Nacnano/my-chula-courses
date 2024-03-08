object Question05 {

  def L(LL:List[Any]):List[Any] = {
    if(LL.isEmpty) Nil
    else L(LL.tail) ++ List(LL.head)
  }
  def palindrome(l :List[Any]): Boolean = {
    if(l.length <= 1) true
    else l.head == L(l).head && palindrome(L(l.tail).tail)
  }


}
