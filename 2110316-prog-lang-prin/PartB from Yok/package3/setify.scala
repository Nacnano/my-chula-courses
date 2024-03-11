package package3

object setify {

  def member(x:Any, l:List[Any]):Boolean = {
    if(l.isEmpty) false
    else if(x == l.head) true
    else member(x, l.tail)
  }

  def setify(l:List[Any]): List[Any] = {
    if(l.isEmpty) List()
    else if(member(l.head, l.tail)) setify(l.tail)
    else l.head :: setify(l.tail)

  }

  def main(args: Array[String]): Unit = {
    val list1: List[Int] = List(1, 5, 4, 3, 2, 5, 5, 5, 3, 2, 1)
    println(setify(list1))
  }
}
