package package1

object WhileForLoop {
  def main(args: Array[String]): Unit = {
    // While loop
    /*
    var x = 0
    while( x < 10 ) {
      x += 1
      println(x)
    }
    */

    // For loop
    /*
    for( x <- 0 to 9) { // to - inclusion
      println(x)
    }
    // multiple range loop
    for(x <- 0 until 5; i <- 0 to 4) {
      println(s"$x, $i")
    }
     */

    // Loop with boolean condition
    for(x<-0 until 5; if x %2 == 0)
      println(x)
    println("--------")
    var myList = List(1, 3, 5, 7)
    for(m <- myList; if m >= 3) {
      println(m)
    }



  }
}
