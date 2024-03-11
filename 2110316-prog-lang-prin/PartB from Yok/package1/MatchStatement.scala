package package1

object MatchStatement {
  def main(args: Array[String]): Unit = {

    // Example 1
    /*
    var x = 45
    x match {
      case 10 => println("x is 10")
      case 20 => println("x is 20")
      case 25 => {
        println("x is 25")
        println("and that's it")
      }
      case 30 => println("x is 30")
      case _ => // default is nothing

    }*/

    var x = 25
    var res = x match {
      case 10 => 10.0
      case 20 => 20.0
      case 25 => {
        x = 33
        25.0
      }
      case 30 => 30.0
      case _ =>
    }
    println(res)
    println(x)

  }
}
