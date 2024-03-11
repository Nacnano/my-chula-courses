package package3

object Dot {

  def dot(l1:List[Int], l2:List[Int]):Int = {
    if(l1.isEmpty || l2.isEmpty) return 0
    return l1.head * l2.head + dot(l1.tail, l2.tail)
  }
  def main(args: Array[String]): Unit = {
    val list1 : List[Int] = List(1, 2, 3, 4)
    val list2: List[Int] = List(10, 20, 30 , 40)

    println(dot(list1, list2))
  }
}
