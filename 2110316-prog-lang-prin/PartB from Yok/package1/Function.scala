package package1

object Function {
  object Math {
    def addM(x:Int=1, y:Int=1):Int = x + y // function can have default argument
    def squareM(x:Int):Int = x*x
  }

  // Unit = void function
  def f1(x:Int):Unit = {
    println(s"x is given = $x")
  }

  def main(args: Array[String]): Unit = {
    println(Function.area(2, 3))
    println(Math.addM(5, 3))
    println("One argument function")
    println(Math squareM 3) // for 1 argument function
    println("Default argument")
    println(Math.addM())
    println("Unit return type function")
    f1(3)

    // Anonymous function
    println("Anonymous function")
    var x = (a:Int, b:Int) => a+b
    var z = (a:Int, b:Int) => {
      var c = a+b
      c*c
    }
    println(x(5, 7))
    println(z(2, 3))
  }

  def area(width:Int, height:Int): Int = {
    width * height
  }

  def areaScale(w: Int, h: Int): Int = {
    val w2 = w+1
    val h2 = h+1
    w2*h2
  }
}
