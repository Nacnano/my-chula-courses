package package2

import scala.annotation.tailrec

object Currying {
  def sum(f:Int=>Int): (Int, Int) => Int = {
    def sumF(a:Int, b:Int):Int = {
      if(a > b) return 0
      return f(a) + sumF(a+1, b)
    }
    return sumF
  }

  def main(args: Array[String]): Unit = {
    val square = (a:Int) => a*a

    println(sum(square)(1, 5))
  }
}
