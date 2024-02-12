object Main {
  def insertInOrder(x: Int, l:List[Int]): List[Int] ={
    if(l.isEmpty || x < l.head)  x :: l
    else l.head :: insertInOrder(x, l.tail)

  }

  def main(args: Array[String]) = {
    var l = List(1, 2, 3, 4, 5, 6);
    println(insertInOrder(4, l))
  }
}
