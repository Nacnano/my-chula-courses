package package3

object sorted {
  def sorted(l:List[Int]):Boolean = {
    if(l.length == 1 || l.isEmpty) true
    else if(l.head > l.tail.head) false
    else sorted(l.tail)

  }
  def main(args: Array[String]): Unit = {
      val list1: List[Int] = List(1, 2, 3, 4, 5, 6)
      val list2: List[Int] = List(1, 2, 3, 6, 5, 4)

    println(sorted(list1))
    println(sorted(list2))
  }
}
