package Homework

object Question01 {
  def insertAtPosition(x: Any, pos: Int, l:List[Any]): List[Any] ={
    if(pos == 0) return x :: l
    return l.head :: insertAtPosition(x, pos-1, l.tail)
  }

  def main(args: Array[String]): Unit = {
    val list = List(1, 2, 3, 4, 5, 6)
    println(insertAtPosition(10, 0, list))
    println(insertAtPosition(10, 6, list))
    println(insertAtPosition(10, 3, list))
  }
}
