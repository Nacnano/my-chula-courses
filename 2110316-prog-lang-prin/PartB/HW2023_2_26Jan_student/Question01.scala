object Question01 {
  def insertAtPosition(x: Any, pos: Int, l:List[Any]): List[Any] = {
    if(pos == 0 || l.isEmpty) x :: l
    else l.head :: insertAtPosition(x, pos - 1, l.tail)
  }

  def main(args: Array[String]) = {
    var l = List(1, 2, 3, 4, 5, 6);
    println(insertAtPosition(15, 2, l))
  }
}
