object Main {
  def insertLast(x: Any, l:List[Any]): List[Any] ={
    if(l.isEmpty) return List(x)
    else return l.head :: insertLast(x, l.tail)
  }

  def main(args: Array[String]): Unit = {

    println(insertLast(1, List(1, 2, 3, 4)))
    println("Hello world!")
  }
}