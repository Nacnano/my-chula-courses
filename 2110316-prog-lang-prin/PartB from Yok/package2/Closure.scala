package package2

object Closure {
  var n = 5
  val add = (x: Int) => x + n

  def main(args: Array[String]): Unit = {
    println(add(2)) // 7
    n = 100
    println(add(2)) // 102
  }
}
