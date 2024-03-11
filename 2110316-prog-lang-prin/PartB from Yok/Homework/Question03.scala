package Homework

import scala.annotation.tailrec

object Question03 {
  
  @tailrec
  def member(x:Any, l:List[Any]): Boolean = {
    if(l.isEmpty) false
    else if(l.head == x) true
    else member(x, l.tail)
  }
  def subList(l1: List[Any], l2:List[Any]): Boolean ={
    if(l1.isEmpty) true
    else if(!member(l1.head, l2)) false
    else subList(l1.tail, l2)
  }

  def main(args: Array[String]): Unit = {
    val list1 = List(1, 2, 2, 3, 3, 3, 3, 3, 4, 5)
    val list2 = List(1, 2, 3, 4, 5, 6)
    val list3 = List(3, 4, 5, 6, 7, 8)
    println(subList(list1, list2)) // True
    println(subList(list3, list2)) // False
    println(subList(Nil, list2)) // True
    println(subList(list2, Nil)) // False
  }

}
