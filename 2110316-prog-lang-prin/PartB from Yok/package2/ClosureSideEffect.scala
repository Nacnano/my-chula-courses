package package2

object ClosureSideEffect {
  var n = 5
  val add = (x: Int) => {
    n = x + n // x is accumulated by n
    n
  }

  def main(args: Array[String]): Unit = {
    println(add(2)) // 7
    n = 100
    println(add(2)) // 102
    println(add(2)) // 104
  }
}