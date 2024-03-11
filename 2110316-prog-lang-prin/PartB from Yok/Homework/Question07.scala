package Homework

object Question07 {
  
  def myMap(f:Int => Int) (list:List[Int]) :List[Int] = {
    if(list.isEmpty) return Nil
    return f(list.head) :: myMap(f)(list.tail)
  }

  def main(args: Array[String]): Unit = {
    val list = List(1, 2, 4, 5, 6, 7, 8, 9)
    println(myMap(x => x * x)(list))
    println(myMap(x => x + 10)(list))
    println(myMap(x => x % 3)(list))
  }

}
