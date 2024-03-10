package oldQuiz

object q1_2022_sec01 {
  def partition(l:List[Int], f:Int => Boolean):List[List[Int]] = {
    if(l.isEmpty) return List(List(),List())
    var x = partition(l.tail, f)
    if(f(l.head))
      List(List(l.head) ++ x.head ,x.tail.head)
    else
      List(x.head ,List(l.head) ++ x.tail.head)
  }
  def f1(x:Int):Boolean = {
    x%2 == 1
  }
  def f2(x:Int):Boolean = {
    x*x > 10
  }

  def main(args: Array[String]):Unit = {
    val l1 = List(1,2,3,4,5)
    println(partition(l1,f1)) // List(List(1, 3, 5), List(2, 4))
    println(partition(l1,f2)) // List(List(4, 5), List(1, 2, 3))
    println(partition(l1,(x => x==0))) // List(List(), List(1, 2, 3, 4, 5))
    println(partition(l1,(x => x<6))) // List(List(1, 2, 3, 4, 5), List())

  }

}
