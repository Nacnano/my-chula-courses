package package3

object delete {

  def delete(x:Any, l:List[Any]):List[Any] = {
    if(l.isEmpty) List()
    else if(l.head == x) delete(x, l.tail)
    else l.head::delete(x, l.tail)

  }
  def main(args: Array[String]): Unit = {
    val list1: List[Int] = List(1, 5, 4, 3, 2, 5, 5, 5, 3, 2, 1)

    println(delete(5, list1))
    println(delete(2, list1))
  }
}
