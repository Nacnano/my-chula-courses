package package1

object MatchFallThrough {
  def main(args: Array[String]): Unit = {
    var x = 35
    x match {
      case 10 | 20 | 30 | 40 | 50 => println(s"x is $x")
      case 25 | 35 | 45 | 55 => {
        println(s"x is $x")
        println("and that's it")
      }
    }
  }
}
