package package1

object LoopOnList {
  def main(args: Array[String]): Unit = {
    var myList = List(1, 3, 5, 7)
    for (m <- myList) {
      println(m)
    }
  }
}
