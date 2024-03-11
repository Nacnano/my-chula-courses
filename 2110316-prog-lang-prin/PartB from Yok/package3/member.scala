package package3

object member {
  def member(x:Any, l:List[Any]):Boolean = {
    if(l.isEmpty) false
    else if(x == l.head) true
    else member(x, l.tail)
  }
  def main(args: Array[String]): Unit = {
    val list1:List[Int] = List(1, 2, 3, 5, 6)
    println(member(5, list1))
  }
}
