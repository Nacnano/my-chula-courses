package Sec01

object compliment {
  def compliment(f:Int => Int):Int => Int = {
    -f(_)
  }
  def f1(x:Int):Int ={
    x -1000
  }
  def main(args: Array[String]): Unit = {
    println(compliment((x => x*x))(-5)) // -25
    println(compliment((x => x*x))(3)) // -9
    println(compliment((x => -1*x*x))(3)) // 9
    val c = compliment(f1)
    println(c(3)) // 997
    println(c(3000)) // -2000
  }
}
