package Homework

object Question06 {

  def myFilter(f:Int => Boolean) (list:List[Int]) :List[Int] = {
    if(list.isEmpty) return Nil
    if(f(list.head)) return list.head :: myFilter(f)(list.tail)
    myFilter(f)(list.tail)
  }

  def main(args: Array[String]): Unit = {
    val list = List(1, 2, 3, 4, 5, 6, 8, 9, 10, 14, 18, 28, 29, 69, 22)
    println(myFilter( _%2 == 0 )(list))
    println(myFilter( _%2 == 1 )(list))
    println(myFilter( _%3 == 0 )(list))
  }
}
