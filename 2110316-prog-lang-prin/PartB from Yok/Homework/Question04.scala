package Homework

object Question04 {

  def reverse(l: List[Any]): List[Any] = {
    if(l.isEmpty) Nil
    else reverse(l.tail) ++ List(l.head)
  }
  def equalList(l1: List[Any], l2: List[Any]): Boolean = {
    if(l1.length != l2.length) false // not necessary for self reversed string
    else if(l1.isEmpty && l2.isEmpty) true
    else if(l1.head != l2.head) false
    else equalList(l1.tail, l2.tail)
  }
  def palindrome(l :List[Any]): Boolean ={
    equalList(l, reverse(l))
  }

  def main(args: Array[String]): Unit = {
    val list1 = List('H', 'E', 'L', 'L')
    val list2 = List('H', 'E', 'L', 'L', 'E', 'H')
    val list3 = List('H', 'E', 'L', 'E', 'H')

    println(palindrome(list1)) // false
    println(palindrome(list2)) // true
    println(palindrome(list3)) // true
    println(palindrome(Nil)) // true
  }

}
