package Sec01

object Partition {

  def filter(l:List[Int], f:Int => Boolean, ans:List[Int]): List[Int] = {
    if(l.isEmpty) return ans
    if( f(l.head) ) return filter(l.tail, f, ans ++ List(l.head))
    return filter(l.tail, f, ans)
  }
  def partition(l:List[Int], f:Int => Boolean): List[List[Int]] = {
    List(filter(l, f, Nil), filter(l, !f(_), Nil))
  }

  def f1(x:Int):Boolean = {
    x%2 == 1
  }
  def f2(x:Int):Boolean = {
    x*x > 10
  }

  def main(args: Array[String]): Unit = {
    val l1 = List(1,2,3,4,5)
    println(partition(l1,f1)) // List(List(1, 3, 5), List(2, 4))
    println(partition(l1,f2)) // List(List(4, 5), List(1, 2, 3))
    println(partition(l1,(x => x==0))) // List(List(), List(1, 2, 3, 4, 5))
    println(partition(l1,(x => x<6))) // List(List(1, 2, 3, 4, 5), List())
  }
}
