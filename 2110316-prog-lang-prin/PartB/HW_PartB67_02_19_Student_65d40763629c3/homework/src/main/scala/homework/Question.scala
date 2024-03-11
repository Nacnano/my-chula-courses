package homework

import scala.annotation.tailrec

object Question {
  def divide(l1:List[Int],l2:List[Int]):List[List[Int]] = {
    if(l1.length < l2.length) divide(l1 ++ List(l2.head),l2.tail)
    else List(l1,l2)
  }
  def merge(l1:List[Int], l2:List[Int]):List[Int] = {
    if(l1.isEmpty) l2
    else if(l2.isEmpty) l1
    else if(l1.head < l2.head) l1.head :: merge(l1.tail,l2)
    else l2.head :: merge(l1,l2.tail)
  }
  def mergesort(l: List[Int]):List[Int] = {
    if(l.length <= 1) l
    else {
      var a = divide(List(), l)
      var b = mergesort(a.head)
      var c = mergesort(a.tail.head)
      merge(b, c)
    }
  }
  def main(args: Array[String]): Unit = {
    println(mergesort(List(3, 5, 7, 8, 3, 4, 1, 2, 6, 7, 199, 28, 188, 258, 29)))
    println(mergesort(Nil))
    println(mergesort(List(99, 88, 77, 66, 55, 44, 33, 22, 1, 2, 3, 4, 5)))
  }
}
