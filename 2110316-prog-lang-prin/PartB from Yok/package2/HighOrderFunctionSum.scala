package package2

import scala.annotation.tailrec

object HighOrderFunctionSum {
  @tailrec
  def sum(f: Int => Int, a:Int, b:Int, acc:Int = 0): Int = {
    if (a > b) return acc
    sum(f, a+1, b, acc + f(a))
  }

  def id(a:Int):Int = a
  def square(a:Int):Int = a*a

  @tailrec
  def factorial(a:Int, acc:Int):Int = {
    if(a==0) return acc
    return factorial(a-1, acc*a)
  }

  def fac(a:Int):Int = factorial(a, 1)

  def main(args: Array[String]): Unit = {
    println(sum(id, 2, 4))
    println(sum(square, 2, 4))
    println(sum(fac, 2, 4))
  }
}
