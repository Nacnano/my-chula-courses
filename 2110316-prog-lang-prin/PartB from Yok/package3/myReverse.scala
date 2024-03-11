package package3

object myReverse {
  def reverse(l:List[Any]):List[Any] = {
    if(l.isEmpty) List()
    else reverse(l.tail) ++ List(l.head)
  }

  def main(args: Array[String]): Unit = {
    val list1: List[Int] = List(1, 2, 3, 4, 5, 6, 7, 8)
    println(reverse(list1))
  }
}
