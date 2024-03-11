package package2

object ChainFunction {
  def calculate(x:Double, y:Double, z:Double, f: (Double, Double)=>Double): Double = {
    f( f(x, y), z);
  }
  def mul(x: Double, y:Double):Double = x * y

  def main(args: Array[String]): Unit = {
    // ADD
    println(calculate(3, 5, 7, (a,b) => a + b))
    println(calculate(3, 5, 7, _+_))

    // Min
    println(calculate(3, 5, 7, (a, b) => a min b))
    println(calculate( 3, 5, 7, _ min _ ))
  }
}
