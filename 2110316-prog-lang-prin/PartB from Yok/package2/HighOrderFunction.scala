package package2

object HighOrderFunction {
  def calculate(x:Double, y:Double, f: (Double, Double)=>Double): Double = {
    f(x, y);
  }
  def mul(x: Double, y:Double):Double = x * y

  def main(args: Array[String]): Unit = {
    println(calculate(3, 5, (a, b) => a+b))
    println(calculate(3, 5, mul))
  }
}
