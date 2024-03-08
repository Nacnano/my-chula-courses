object Main {
  def sum(list: List[Int]): Int = {
    if(list.isEmpty) return 0
    else return list.head + sum(list.tail)
  }
  def sumAll(lists:List[List[Int]]) :List[Int] = {
    if(lists.isEmpty) return Nil
    if(lists.head.isEmpty) return sumAll(lists.tail)
    else return sum(lists.head) :: sumAll(lists.tail)
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