object Main {

  def member(x: Any, l: List[Any]): Boolean = {
    if(l.isEmpty) return false
    if (x == l.head) return true
    else return member(x, l.tail)
  }

  def sorted(l: List[Int]): Boolean = {
    if(l.isEmpty || l.tail.isEmpty) return true
    else if(l.head <= l.tail.head) return sorted(l.tail)
    else return false
  }

  def delete(x: Any, l: List[Any]): List[Any] = {
    if(l.isEmpty) return Nil
    else if(l.head == x) return delete(x, l.tail)
    else return l.head :: delete(x, l.tail)
  }

  def length(l: List[Any]): Int = {
    if (l.isEmpty) return 0
    else return 1 + length(l.tail)
  }

  def myReverse(l: List[Any]): List[Any] = {
    if(l.isEmpty) return Nil
    else return  myReverse(l.tail) ++ List(l.head)
  }

  def dot(l1: List[Int], l2: List[Int]): Int = {
    if(l1.isEmpty) return 0
    else return l1.head * l2.head + dot(l1.tail, l2.tail)
  }

  def max(l: List[Int]): Int = {
    if(l.tail.isEmpty) return l.head
    else if(l.head > max(l.tail)) return l.head
    else return max(l.tail)
  }

  def setify(l: List[Any]): List[Any] = {
    if(l.isEmpty) return Nil
    if(member(l.head, l.tail)) return setify(l.tail)
    else return l.head :: setify(l.tail)
  }


  def main(args: Array[String]): Unit = {

    println(member(5, List(1, 2, 3, 4)))
    println(sorted(List(1, 2, 3, 4)))
    println(delete(1, List(1, 4, 3, 1, 5)))
    println(length(List(1, 2, 3, 4, 5)))

    println("REVERSE ", myReverse(List(1, 2, 3)))
    println("DOT ", dot(List(1, 2, 3), List(1, 2, 3)))
    println("MAX ", max(List(1, 2, 3)))

    printf("%d", 1)
  }
}
