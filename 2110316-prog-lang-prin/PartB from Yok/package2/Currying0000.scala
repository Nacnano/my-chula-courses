package package2

object Currying0000 {
  def add(x: Int, y: Int): Int = x + y

  def addCurry(x:Int):Int => Int = {
    (y:Int) => x + y
  }

  def addCurryShort(x:Int)(y:Int):Int = x + y

  def main(args: Array[String]): Unit = {
    println(addCurry(3)(5))

    val sum30 = addCurry(30)
    println(sum30(9))

    val sum20 = addCurryShort(20)_ // for short
    println(sum20(7))
  }
}