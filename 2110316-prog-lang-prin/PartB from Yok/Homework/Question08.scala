package Homework

import scala.annotation.tailrec

object Question08 {
  val INF = 2000000000
  @tailrec
  def member(lists:List[Int], index:Int): Int = {
    if(lists.isEmpty) -INF
    else if(index == 0) lists.head
    else member(lists.tail, index-1)
  }

  @tailrec
  def maxCol(lists:List[List[Int]], col:Int, acc:Int = -INF): Int = {
    if(lists.isEmpty) return acc
    val cur = member(lists.head, col)
    if(cur > acc) maxCol(lists.tail, col, cur)
    else maxCol(lists.tail, col, acc)
  }

  @tailrec
  def maxAll(lists:List[List[Int]], col:Int, acc:List[Int] = Nil): List[Int] = {
    val mx = maxCol(lists, col)
    if(mx == -INF) acc
    else maxAll(lists, col+1, acc ++ (mx::Nil))
  }

  def maxAll(lists:List[List[Int]]) :List[Int] = {
    maxAll(lists, 0)
  }


  def main(args: Array[String]): Unit = {
    println(maxAll(List()))
    println(maxAll(List(List())))
    println(maxAll(List(List(1,2,3,4,8,9),List(),List(4,5),List(1,2,3,5,6,10,11))))
    println(maxAll(List(List(3,4),List(1,2,3,4,51,61),List(1,2,31,41,61,51))))
    println(maxAll(List(List(1,2,3,40,5,6),List(10,2,30,4),List(1,200),List(0,0,0,0,0,0,0,0,9))))
  }

}
/*
1 2 3 4 8 9

4 5
1 2 3 5 6 10 11
 */