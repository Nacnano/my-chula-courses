package package2

object FunctionPartiallyApplied {
  def mul(x:Double, y:Double): Double = {
    x * y
  }

  def partialMul(y:Double) = {
    mul(3, y)
  }

  def main(args: Array[String]): Unit = {
    val sum = (x:Double, y:Double, z:Double) => x + y + z // fully applied function
    val f = sum(3, 5, _:Double) // partial add need to specify z argument in f
    val g = mul(_:Double, 10)

    println(f(2))
    println(g(5))
    println(partialMul(3))

  }
}
