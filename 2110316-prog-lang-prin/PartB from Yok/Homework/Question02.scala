package Homework

object Question02 {
  def insertInOrder(x: Int, l:List[Int]): List[Int] ={
    if(l.isEmpty) x::Nil
    else if(x < l.head) x::l
    else l.head::insertInOrder(x, l.tail)
  }
  def main(args: Array[String]): Unit = {
    val list = List(1, 2, 3, 4, 5, 6)
    println(insertInOrder(10, list))
    println(insertInOrder(2, list))
    println(insertInOrder(-1, list))
  }

}
