object Question05 {
  def reverse(list:List[Any]):List[Any] = {
    if(list.isEmpty) Nil
    else reverse(list.tail) ++ List(list.head)
  }
  def palindrome(l :List[Any]): Boolean = {
    if(l.length <= 1) true
    else l.head == reverse(l).head && palindrome(reverse(l.tail).tail)
  }
}
