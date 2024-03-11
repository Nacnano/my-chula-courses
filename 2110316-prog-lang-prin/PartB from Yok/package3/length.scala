package package3

object length {
  def length(l:List[Any]): Int = {
    if(l.isEmpty) 0
    else 1 + length(l.tail)
  }

  def main(args: Array[String]): Unit = {
    val list1: List[Int] = List(1, 2, 3, 4, 5, 6, 7)
    println(length(list1))
  }
}
