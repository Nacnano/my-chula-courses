package package1

object IfElseExample {
  def main(args: Array[String]): Unit = {

    // Example 1
//    var age = 15;
//    var x = 3;
//    var message = ""
//    if (age == 15) {
//      message = "age is 15"
//      x += 1;
//    }
//    else {
//      message = "age is not 15"
//      x -= 1;
//    }
//    println(message)
//    println(x)

    // Example 2
    var age=15
    var x=3
    var message=""

    var result = if(age!=15) "age is not 15" else "age is 15"
    println(result)
  }
}
