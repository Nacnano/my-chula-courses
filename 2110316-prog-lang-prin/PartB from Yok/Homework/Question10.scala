package Homework

object Question10 {

  def alternate(f1: (Int,Int) => Int, f2: (Int,Int) => Int, list:List[Int]):Int = {
    if(list.isEmpty) return 0
    if(list.length == 1) return list.head
    // list.length >= 2
    def apply(list: List[Int], n:Int, acc:Int): Int = {
      if(list.isEmpty) return acc
      if(n % 2 == 0) apply(list.tail, n + 1, f1(acc, list.head))
      else apply(list.tail, n+1, f2(acc, list.head))
    }

    return apply(list.tail, 0, list.head)
  }

  def main(args: Array[String]): Unit = {
    println( alternate(_+_, _-_, List()) )
    println( alternate(_+_, _-_, List(55)) )
    println( alternate(_+_, _-_, List(1, 2)) )
    println( alternate(_+_, _-_, List(1, 2, 3)) )
    println( alternate(_+_, _-_, List(1, 2, 3, 4)) )
  }

}
