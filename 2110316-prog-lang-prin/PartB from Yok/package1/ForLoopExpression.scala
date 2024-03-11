package package1

object ForLoopExpression {
  def main(args: Array[String]): Unit = {
    var r1 = for {x <- 0 until 5; if x%2 == 0} yield {
      x
    }
    println(r1)
    println("-------------")
    var myList = List(1,3,5,7)
    var r2 = for{m <- myList; if m >= 3} yield {
      m
    }
    println(r2)
  }
}
