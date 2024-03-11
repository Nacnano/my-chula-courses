package Homework

import scala.annotation.tailrec

object Question05 {

  // get half left and half right
  @tailrec
  def getD(dir:Int = 0, l:List[Int], size:Int, mem:List[Int] = Nil): List[Int] = {
    if(size == 0) {
      if(dir == 0) mem
      else l
    }
    else if(dir == 0) getD(dir, l.tail, size-1, mem ++ List(l.head))
    else getD(dir, l.tail, size-1)
  }

  @tailrec
  def merge(l:List[Int], r:List[Int], mem:List[Int] = Nil):List[Int] = {
    if(l.isEmpty || r.isEmpty) return mem ++ l ++ r
    if(l.head > r.head) return merge(l, r.tail, mem ++ (r.head :: Nil))
    else return merge(l.tail, r, mem ++ (l.head :: Nil))
  }

  def mergesort(l: List[Int]):List[Int] = {
    if (l.isEmpty) return Nil
    if (l.length == 1) return l
    val size = l.length / 2
    val left = mergesort(getD(0, l, size)) // 0 left
    val right = mergesort(getD(1, l, size)) // 1 right
    merge(left, right)
  }

  def main(args: Array[String]): Unit = {
    println(mergesort(List(3, 5, 7, 8, 3, 4, 1, 2, 6, 7, 199, 28, 188, 258, 29)))
    println(mergesort(Nil))
    println(mergesort(List(99, 88, 77, 66, 55, 44, 33, 22, 1, 2, 3, 4, 5)))
  }
}
