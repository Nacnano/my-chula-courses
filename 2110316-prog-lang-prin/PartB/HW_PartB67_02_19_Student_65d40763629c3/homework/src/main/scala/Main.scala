object Main {
  def sumAll(lists:List[List[Int]]) :List[Int] = {
    if(lists.isEmpty) Nil
    else if(lists.length == 1) lists.head
    else {
      var g = sumAll(lists.tail)
      if(lists.head.isEmpty) g
      else if(g.isEmpty) lists.head
      else  (lists.head.head+g.head) :: sumAll(List(lists.head.tail, g.tail))
    }
  }
  def main(args: Array[String]): Unit = {
    println(sumAll(List()))
    println(sumAll(List(List())))
    println(sumAll(List(List(1,2,3,4),List(),List(4,5),List(1,2,3,4,5,6))))
    println(sumAll(List(List(3,4),List(1,2,3,4,5,6),List(1,2,3,4))))
    println(sumAll(List(List(1,2,3,4,5,6),List(1,2,3,4),List(1,2),List(0,0,0,0,0,0,0,0,9))))
    println("Hello world!")
  }
}