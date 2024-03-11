package package3

import scala.annotation.tailrec

object max {

  @tailrec
  def maxx(l:List[Int], mx:Int):Int = {
    if(l.isEmpty) return mx
    if(l.head > mx)
      maxx(l.tail, l.head)
    else
      maxx(l.tail, mx)
  }

  def max(l:List[Int]):Int = {
    return maxx(l, -2000000000)
  }

  def main(args: Array[String]): Unit = {
    val list:List[Int] = List(1, 10, 50, 2, 4, 58, 80, 0, 15)
    println(max(list))
  }
}
