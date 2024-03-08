package homework

object Question {

  def L(LL:List[Any]):List[Any] = {
    if(LL.isEmpty) Nil
    else L(LL.tail) ++ List(LL.head)
  }
  def palindrome(l :List[Any]): Boolean = {
    if(l.length <= 1) true
    else l.head == L(l).head && palindrome(L(l.tail).tail)
  }
  def main(args:Array[String]):Unit = {
    println(palindrome(List(1,2,3,4,5,6,6,5,4,3,2,1)))
  }


}
