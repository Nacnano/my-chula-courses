object Main {
  def calc(f: (Int)=> Int, op: (Int, Int)=> Int, startValue: Int)(a: Int, b:Int): Int = {
    if(a > b) return startValue
    else op(f(a), calc(f, op, startValue)(a+1, b))
  }

  def id(a: Int):Int = {
    a
  }

  def square(a: Int): Int = {
    a*a
  }

  def product(a:Int, b: Int): Int = {
    a * b
  }

  def add(a:Int, b: Int): Int = {
    a + b
  }

  def main(args: Array[String]): Unit = {
    println(calc(id, product, 1)(1, 5))
    println(calc(square, add, 0)(1, 3))
  }
}
