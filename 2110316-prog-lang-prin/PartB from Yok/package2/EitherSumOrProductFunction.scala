package package2

object EitherSumOrProductFunction {
  def getFunc(f:Int => Int, op:(Int, Int) => Int, startVal:Int)(a:Int, b:Int):Int = {
    if(a > b) startVal
    else op( f(a), getFunc(f, op, startVal)(a+1, b) )
  }
  def main(args: Array[String]): Unit = {
    val id = (a: Int) => a
    val square = (a:Int) => a*a
    println(getFunc(id, _+_, 0)(1, 10))
    println(getFunc(square, _*_, 1)(3, 5))
  }
}
